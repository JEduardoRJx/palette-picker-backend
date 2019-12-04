const express = require('express');
const app = express();
const cors = require('cors');

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(cors());

app.use(express.json());

app.locals.title = "Welcome to Tone Zone api. Get yo' color on."

app.get('/', (request, response ) => {
  response.send(app.locals.title)
})

export default app;
