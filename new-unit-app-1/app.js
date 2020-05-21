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

const books = require('./db')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/books', (req, res) => {
  res.json(books)
})

app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const result = books.find(book => book.id === id)
  res.json(result)
})

app.post('/books', (req, res) => {
  books.push(req.body)
  res.status(201).json(req.body)
})

app.put('/books/:id', (req, res) => {
  const updateIndex = books.findIndex(book => book.id === req.params.id)
  res.json(Object.assign(books[updateIndex], req.body))
})

app.delete('/books/:id', (req, res) => {
   const deletedIndex = books.findIndex(book => book.id === req.params.id)
   books.splice(deletedIndex, 1)
   res.status(204).send()
})

app.get('/', (req, res) => res.send('Hello, Unit!'))

createServer(app).listen()
