const express = require('express');
const app = express();
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(express.json());
app.locals.title = "Welcome to Tone Zone api. Get yo' color on."

// GET displays title on main page
app.get('/', (request, response ) => {
  response.send(app.locals.title);
})

// GET all projects from a user
app.get('/api/v1/:user_id/projects', async (request, response) => {
  try {
    const { user_id } = request.params
    const projects = await database('projects')
      .select()
      .where('user_id', user_id)
      response.status(200).json(projects);
  } catch(error) {
    response.status(500).json({ error });
  }
})

// GET a specific project from a user
app.get('/api/v1/:user_id/projects/:id', async (request, response) => {
  try {
    const { user_id, id } = request.params;
    console.log(user_id, id)
    const projects = await database('projects')
      .select()
      .where('user_id', user_id)
      .where('id', id)
    response.status(200).json(projects);
  } catch(error) {
    response.status(500).json({ error });
  }
})

// GET all palettes from a user
app.get('/api/v1/:user_id/projects/:project_id/palettes', async (request, response) => {
  try {
    const { user_id, project_id } = request.params;
    const palettes = await database('palettes')
      .select()
      .where('id', user_id)
      .where('project_id', project_id)
      response.status(200).json(palettes);
  } catch {
    response.status(500).json({ error });
  }
})

// GET a specific pallete from a user
app.get('/api/v1/:user_id/projects/:project_id/palettes/:id', async (request, response) => {
  try {
    const { user_id, project_id, id } = request.params;
    const project = await database('projects')
    .select()
    .where('user_id', user_id)
    .where('id', project_id)

    const palettes = await database('palettes')
      .select()
      .where('project_id', project[0].id)
      .where('id', id)
      response.status(200).json(palettes);
  } catch(error) {
    response.status(500).json({ error });
  }
})

export default app;