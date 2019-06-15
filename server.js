import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import http from "http";
import socketIO from "socket.io";

import countDown from "./server/countDown"
import opennode from "./server/opennode"
import socketEvents from "./server/socket"
import initStore from "./server/store"

import { updateBalance } from "./server/helpers"

const PORT = process.env.PORT || 3001

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html


app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'Worlds';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

const server = http.createServer(app)

const io = socketIO(server)


app.post('/webhook/charge', (req, res) => {
  const charge = req.body;
  const isValid = opennode.signatureIsValid(charge);
  console.log('hooked on')
  if (isValid && charge.status === 'paid') {
      //Signature is valid
    updateBalance(io, charge.description, parseInt(charge.price, 10))
  }
  else {
      //Signature is invalid. Ignore.
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

io.on("connection", socket => {
  socket.setMaxListeners(20)
  socketEvents(socket)
})

const MONGO_URL = process.env.MONGODB_URI || `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@cluster0-0vkq1.gcp.mongodb.net/${process.env.MONGODB}?retryWrites=true`

mongoose.connect( MONGO_URL,
  { useNewUrlParser: true }
)
.then(() => {
  server.listen(PORT, () => console.log('Express server is running on localhost:3001'));
  initStore();
  countDown(io);
})
.catch(err => {
  console.log(err);
})


