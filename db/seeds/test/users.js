
const data = require('../../../data');
const users = data.users;
const projects = data.projects;
const palettes = data.palettes;

const createUser = (knex, user) => {
  return knex('users').insert({
    username: user.username,
    password: user.password
  });
}

const createProject = (knex, project) => {
  let userID = knex.from('users')
    .select('id')
    .where('id', project.user_id)
  return knex('projects').insert({
    project_name: project.project_name,
    user_id: userID
  })
}

const createPalette = (knex, palette) => {
  let projectID = knex.from('projects')
    .select('id')
    .where('id', palette.project_id)
  return knex('palettes').insert({
    palette_name: palette.palette_name,
    project_id: projectID,
    color1: palette.color1,
    color2: palette.color2,
    color3: palette.color3,
    color4: palette.color4,
    color5: palette.color5
  })
}

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => knex('users').del())
    .then(() => {
      let userPromises = [];
      users.forEach(user => {
        userPromises.push(createUser(knex, user));
      });
      return Promise.all(userPromises);
    })
    .then(() => {
      let projectPromises = [];
      projects.forEach(project => {
        projectPromises.push(createProject(knex, project));
      });
      return Promise.all(projectPromises);
    })
    .then(() => {
      let palettePromises = [];
      palettes.forEach(palette => {
        palettePromises.push(createPalette(knex, palette));
      });
      return Promise.all(palettePromises);
    })
    .catch(error => console.log(`Error seeding data ${error}`))
};
