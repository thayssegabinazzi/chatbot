"use strict"

const mongoose = require('mongoose')
require("dotenv").config({ silent: true })
require('saslprep')

let opts = {
    server: { auto_reconnect: true },
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD
}

let host = 'mongodb://' + process.env.MONGODB_HOST + '/' + process.env.MONGODB_DATABASE
module.exports = mongoose.connect(host, opts)