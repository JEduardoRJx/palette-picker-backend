const data = require('../../../data');
const users = data.users;
const projects = data.projects;
const palettes = data.palettes;

const createUser = (knex, user) => {
  return knex('users').insert({
    username: user.username,
    password: user.password
  }, 'id')
  .then(userID => {
    let projectPromises = [];
    projects.filter(project => project.user_id === user.id)
    .forEach(project => {
      let projectInfo = {
        project_name: project.project_name,
        user_id: userID[0],
        project_id: project.project_id
      }
      projectPromises.push(createProject(knex, projectInfo))
    })
    return Promise.all(projectPromises)
  })
  
}

const createProject = (knex, project) => {
  return knex('projects').insert({
    project_name: project.project_name,
    user_id: project.user_id
  }, 'id')
  .then(projectID => {
    let palettePromises = [];
    palettes.filter(palette => palette.project_id === project.project_id)
    .forEach(palette => {
      let paletteInfo = {
        palette_name: palette.palette_name,
        project_id: projectID[0],
        color1: palette.color1,
        color2: palette.color2,
        color3: palette.color3,
        color4: palette.color4,
        color5: palette.color5
      }
      palettePromises.push(createPalette(knex, paletteInfo));
    })
    return Promise.all(palettePromises);
  })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette)
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
      })
      return Promise.all(userPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};