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
    it('should return 200 status code and all of the specified users projects', async() => {
      //Setup
      const expectedProjects = await database('projects').first();
      console.log(expectedProjects)
      //Execution
      const response = await request(app).get('/api/v1/1/projects');
      const projects = response.body;

      //Expectation
      expect(response.status).toBe(200);
      expect(projects).toEqual(expectedProjects);
    })
  })

  describe('GET /api/v1/:user_id/projects/:project_id', () => {
    it('should return a 200 status code and all of the specified users specific project', () => {
      //Setup
      const expectedProject = await database('projects').first();

      //Exection
      const response = await request(app).get('/api/v1/1/projects/1');
      const project = response.body
      //Expectation
      expect(response.state).toBe(200);
      expect(project).toEqual(expectedProject);
    })
  })
});