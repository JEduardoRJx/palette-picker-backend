const cors = require('cors');
app.use(cors());

const express = require('express');
const app = express();
app.use(express.json());

app.locals.title = "Welcome to Tone Zone api. Get yo' color on."