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
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json({ error: "User not found" })
      }
  } catch(error) {
    response.status(500).json({ error });
  }
})

// GET a specific project from a user
app.get('/api/v1/:user_id/projects/:id', async (request, response) => {
  try {
    const { user_id, id } = request.params;
    const projects = await database('projects')
      .select()
      .where('user_id', user_id)
      .where('id', id)
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json({ error: "Project not found" })
      }
  } catch(error) {
    response.status(500).json({ error });
  }
})

// GET all palettes from a user
app.get('/api/v1/:user_id/projects/:project_id/palettes', async (request, response) => {
  try {
    const { project_id } = request.params;
    const palettes = await database('palettes')
      .select()
      .where('project_id', project_id)
      if(palettes.length) {
        response.status(200).json(palettes);
      } else {
        response.status(404).json({ error: "Project not found, no palettes to return" })

      }
  } catch {
    response.status(500).json({ error });
  }
})

// GET a specific pallete from a user
app.get('/api/v1/:user_id/projects/:project_id/palettes/:id', async (request, response) => {
  try {
    const { project_id, id } = request.params;
    const project = await database('projects')
    .select()
    .where('id', project_id)
    const palettes = await database('palettes')
      .select()
      .where('project_id', project[0].id)
      .where('id', id)
      if(palettes.length) {
        response.status(200).json(palettes);
      } else {
        response.status(404).json({ error: "Palette not found" })
      }
  } catch(error) {
    response.status(500).json({ error });
  }
})

// POST a new project
app.post('/api/v1/:user_id/projects', async (request, response) => {
  const project = request.body;
  for ( let key of [
    'project_name',
    'user_id'
  ]) {
    if (!project[key]) {
      return response.status(422).send({ error: `POST failed, missing the required key: ${key}`});
    }
  }
  
  try {
    const newProject = await database('projects').insert(project, 'id');
    const postedProject = await database('projects')
      .select()
      .where('id', newProject[0])
    response.status(201).json({ id: newProject[0], message: `Project ${postedProject[0].project_name} has been created with an id of ${postedProject[0].id}`})
  } catch(error) {
    response.status(500).json({ error });
  }
})

// Post a new palette
app.post('/api/v1/:user_id/projects/:project_id/palettes', async (request, response) => {
  const palette = request.body;
  for (let key of [
    'palette_name',
    'project_id',
    'color1',
    'color2',
    'color3',
    'color4',
    'color5'
  ]) {
    if(!palette[key]) {
      return response.status(422).send({ error: `POST failed, missing the required key: ${key}`});
    }
  }
  try {
    const newPalette = await database('palettes').insert(palette, 'id');
    const postedPalette = await database('palettes')
      .select()
      .where('id', newPalette[0])
    response.status(201).json({ id: newPalette[0], message: `Palette ${postedPalette[0].palette_name} has been created with an id of ${postedPalette[0].id}`})
  } catch(error) {
    response.status(500).json({ error })
  }
})

// DELETE a project
app.delete('/api/v1/:user_id/projects/:project_id', async (request, response) => {
  const { user_id, project_id } = request.params
  try {
    const projectToDelete = await database('projects')
    .where({user_id: user_id})
    .where({ id : project_id})
    .select()
      if (!projectToDelete.length) {
        return response.status(404).send({error: `Could not find project with the id: ${project_id} belonging to user with id: ${user_id}`})
      }

    const palettesToDelete = await database('palettes')
    .where({ project_id: project_id})
    .del();

    const deleteProject = await database('projects')
    .where({ id : project_id})
    .del();

    response.status(204).json({ message: `Project ${deleteProject.project_name} has been deleted`})
  } catch(error) {
    response.status(500).json({ error })
  }
})

// DELETE a palette
// app.delete('/api/v1/:user_id/projects/:project_id/palettes/:palette_id', async (request, response) => {
//   try {

//   } catch(error) {
    
//   }
// })

// PUT/PATCH
// - A Project
// - A palette

export default app;