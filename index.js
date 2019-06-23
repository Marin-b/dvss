require('dotenv').config(); // loads .env
require = require("esm")(module/*, options*/) // esm - allows use of ES6 syntax as node uses ES5
module.exports = require("./server") //loads the server
