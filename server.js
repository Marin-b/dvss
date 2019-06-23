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

// const path = require('path')
// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'client/build')))
// // Anything that doesn't match the above, send back index.html

// example for express - not imp - does nothing - delete
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
  } //chargeDescription = userID
  else {
      //Signature is invalid. Ignore.
  }
})

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })

io.on("connection", socket => { //everytime someone loads the page this runs - connector
  socket.setMaxListeners(20)
  socketEvents(socket)
})
// creates a socket for each user and can be used to communicate with the user using that socket
const MONGO_URL = process.env.MONGODB_URI || `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@cluster0-8n4ug.mongodb.net/${process.env.MONGODB}?retryWrites=true`

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


