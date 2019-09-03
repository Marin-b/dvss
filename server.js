import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import http from "http";
import socketIO from "socket.io";

import valueTicker from "./server/valueTicker"
import opennode from "./server/opennode"
import socketEvents from "./server/socket"
import initStore from "./server/store"
import { User, Bet, Withdraw } from "./server/schemas";

import { updateBalance, getUserFromWithdrawId } from "./server/helpers"
const PORT = process.env.PORT || 3001

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// const path = require('path')
// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'client/build')))
// // Anything that doesn't match the above, send back index.html

const server = http.createServer(app)

const io = socketIO(server)


app.post('/webhook/charge', (req, res) => {
  const charge = req.body;
  const isValid = opennode.signatureIsValid(charge);
  if (isValid && charge.status === 'paid') {
      //Signature is valid
    updateBalance(io, charge.description, parseInt(charge.price, 10))
  }
  else {
      //Signature is invalid. Ignore.
  }
})


app.post('/webhook/withdraw', async (req, res) => {
  console.log("webhook activated")
  const withdrawal = req.body
  const received = withdrawal.hashed_order;
  const isValid = opennode.signatureIsValid(withdrawal);
  const withUserId = await getUserFromWithdrawId(withdrawal.id)
  console.log(req.body)
  if (isValid && withdrawal.status == "confirmed") {
      //Signature is valid
      updateBalance(io, withUserId, parseInt(withdrawal.amount, 10) * -1);
  }
  else {
      //Signature is invalid. Ignore.
  }
})

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })

io.on("connection", socket => {
  socket.setMaxListeners(20)
  socketEvents(socket)
})

const MONGO_URL = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/dvss`

mongoose.connect( MONGO_URL,
  { useNewUrlParser: true }
)
.then(() => {
  server.listen(PORT, () => console.log('Express server is running on localhost:3001'));
  initStore();
  valueTicker(io);
})
.catch(err => {
  console.log(err);
})


