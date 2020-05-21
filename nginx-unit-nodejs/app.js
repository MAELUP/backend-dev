#!/usr/bin/env node
const {
  createServer,
  IncomingMessage,
  ServerResponse,
} = require('unit-http')

require('http').ServerResponse = ServerResponse
require('http').IncomingMessage = IncomingMessage


var express = require('express');
var app = express();


var fs = require("fs"); //read user.json

app.get('/getUsers', function(req, res){
    fs.readFile( __dirname + "/" + "user.json", 'utf8' , function (err,data){
        console.log(data);
        res.end(data);
    });
});

app.get('/', (req, res) => res.send('Hello, Unit!'))

createServer(app).listen()
