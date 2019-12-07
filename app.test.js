import '@babel/polyfill';
import request from 'supertest';
import app from './app';

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

describe('Server', () => {
  beforeEach(async () => {
    await database.seed.run()
  })

  describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
    });
  });

  describe('GET /api/v1/:user_id/projects', () => {
    it('should return 200 status code and all of the specified users projects', async () => {
      //Setup
      const user = await database('users').first();
      const { id } = user;
      let expectedProjects = await database('projects')
        .select()
        .where('user_id', id)
        expectedProjects = expectedProjects.map(project => ({id: project.id, user_id: project.user_id, project_name: project.project_name}))
      
      //Execution
      const response = await request(app).get(`/api/v1/${id}/projects`);
      let projects = response.body
      projects = projects.map(project => ({id: project.id, user_id: project.user_id, project_name: project.project_name}))

      //Expectation
      expect(response.status).toBe(200);
      expect(projects).toEqual(expectedProjects);
    });

    it('should return a 404 and the message "User not found" ', async () => {
      const invalidID = -1;

      const response = await request(app).get(`/api/v1/${invalidID}/projects`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('User not found');
    })
  });

  describe('GET /api/v1/:user_id/projects/:project_id', () => {
    it('should return a 200 status code and all of the specified users specific project', async () => {
      //Setup
      let expectedUser = await database('users').first();
      const user_id = expectedUser.id
      let expectedProject = await database('projects').first()
        .select()
        .where('user_id', user_id)
      expectedProject = [expectedProject].map(project => ({id: project.id, user_id: project.user_id, project_name: project.project_name}))
      const { id } = expectedProject[0];
      //Exection
      const response = await request(app).get(`/api/v1/${user_id}/projects/${id}`);
      let project = response.body[0]
      project = [project].map(project => ({id: project.id, user_id: project.user_id, project_name: project.project_name}))
      //Expectation
      expect(response.status).toBe(200);
      expect(project).toEqual(expectedProject);
    });

    it('should return a 404 and the message "Project not found" ', async () => {
      let expectedUser = await database('users').first();
      const user_id = expectedUser.id
      const invalidID = -1;

      const response = await request(app).get(`/api/v1/${user_id}/projects/${invalidID}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Project not found');
    });
  });

  describe('GET /api/v1/:user_id/projects/:project_id/palettes',  () => {
    it('should return a status code of 200 and return all palettes from a specified users specific project', async () => {
      let expectedUser = await database('users').first();
      const user_id = expectedUser.id
      //Setup
    let expectedPalettes = await database('palettes').first();
    const { id } = expectedPalettes;
    //Execution
    const response = await request(app).get(`/api/v1/${user_id}/projects/${id}/palettes`);
    let palettes = response.body[0];

    //Expectation
    expect(response.status).toBe(200);
    expect(palettes).toEqual(expectedPalettes)
    });

    it.skip('should return a 404 and the message "Project not found, no palettes to return" ', async () => {

      const invalidID = -1;

      const response = await request(app).get(`/api/v1/:user_id/projects/${invalidID}/palettes`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Project not found, no palettes to return');
    });
  });

  describe('GET /api/v1/:user_id/projects/:project_id/palettes/:palette_id',  () => {
      it.skip('should return a status code of 200 and the specific palette requested', async () => {

        //Setup
      const expectedPalette = await database('palettes').first();
      const { id } = expectedPalette;

      //Expectation
      const response = await response(app).get(`/api/v1/:user_id/projects/:project_id/palettes/${id}`);
      const palette = response.body;

      //Execution
      expect(response.status).toBe(200);
      expect(palette).toEqual(expectedPalette);
      });

    it.skip('should return a 404 and the message "Palette not found" ', async () => {

      const invalidID = -1;

      const response = await request(app).get(`/api/v1/:user_id/projects/:project_id/palettes/${invalidID}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Palette not found');
    });
  });
});