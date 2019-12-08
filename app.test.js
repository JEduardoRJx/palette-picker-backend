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
      //Setup
      let expectedUser = await database('users').first();
      const user_id = expectedUser.id

      let expectedProject = await database('projects').first()
        .select()
        .where('user_id', user_id)
      const project_id = expectedProject.id;
      let expectedPalettes = await database('palettes')
        .select()
        .where('project_id', project_id)
        expectedPalettes = expectedPalettes.map(palette => ({id: palette.id,
          palette_name: palette.palette_name,
          project_id: palette.project_id,
          color1: palette.color1,
          color2: palette.color2,
          color3: palette.color3,
          color4: palette.color4,
          color5: palette.color5,}))
    //Execution
    const response = await request(app).get(`/api/v1/${user_id}/projects/${project_id}/palettes`);
    let palettes = response.body;
    palettes = palettes.map(palette => ({id: palette.id,
      palette_name: palette.palette_name,
      project_id: palette.project_id,
      color1: palette.color1,
      color2: palette.color2,
      color3: palette.color3,
      color4: palette.color4,
      color5: palette.color5,}))

    //Expectation
    expect(response.status).toBe(200);
    expect(palettes).toEqual(expectedPalettes)
    });

    it('should return a 404 and the message "Project not found, no palettes to return" ', async () => {

      const invalidID = -1;

      const response = await request(app).get(`/api/v1/:user_id/projects/${invalidID}/palettes`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Project not found, no palettes to return');
    });
  });

  describe('GET /api/v1/:user_id/projects/:project_id/palettes/:palette_id',  () => {
      it('should return a status code of 200 and the specific palette requested', async () => {
        //Setup
        let expectedUser = await database('users').first();
          const user_id = expectedUser.id

        let expectedProject = await database('projects').first()
          .select()
          .where('user_id', user_id)
        const project_id = expectedProject.id;
        let expectedPalette = await database('palettes').first()
          .select()
          .where('project_id', project_id)
        const { id } = expectedPalette;
        expectedPalette = [expectedPalette].map(palette => ({id: palette.id,
          palette_name: palette.palette_name,
          project_id: palette.project_id,
          color1: palette.color1,
          color2: palette.color2,
          color3: palette.color3,
          color4: palette.color4,
          color5: palette.color5,}))
        //Expectation
        const response = await request(app).get(`/api/v1/${user_id}/projects/${project_id}/palettes/${id}`);
        let palette = response.body[0];
        palette = [palette].map(curPalette => ({id: curPalette.id,
          palette_name: curPalette.palette_name,
          project_id: curPalette.project_id,
          color1: curPalette.color1,
          color2: curPalette.color2,
          color3: curPalette.color3,
          color4: curPalette.color4,
          color5: curPalette.color5,}))



        //Execution
        expect(response.status).toBe(200);
        expect(palette).toEqual(expectedPalette);
      });

    it('should return a 404 and the message "Palette not found" ', async () => {
      let expectedUser = await database('users').first();
      const user_id = expectedUser.id

      let expectedProject = await database('projects').first()
      const project_id = expectedProject.id
      const invalidID = -1;

      const response = await request(app).get(`/api/v1/${user_id}/projects/${project_id}/palettes/${invalidID}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Palette not found');
    });
  });

  describe('POST /api/v1/:user_id/projects', () => {
    it('should return a status of 201 and add a new project to the database', async () => {
      let expectedUser = await database('users').first();
      const user_id = expectedUser.id
      const newProject = { project_name: 'Christmas', user_id: user_id }

    const response = await request(app)
      .post(`/api/v1/${newProject.user_id}/projects`)
      .send(newProject);
    const projects = await database('projects')
      .where('id', response.body.id)
      .select();
    const project = projects[0];

    expect(response.status).toBe(201);
    expect(project.project_name).toBe(newProject.project_name)
    expect(project.user_id).toBe(newProject.user_id)

    });

    it('should return a status 422 and the message "POST failed, missing the required key:"', async () => {
      const newProject = { project_name: 'Halloween' };

      const response = await request(app)
        .post(`/api/v1/2/projects`)
        .send(newProject);
      
      expect(response.status).toBe(422);
      expect(response.text.includes("POST failed, missing the required key: user_id")).toBe(true)
    })
  });

  describe('POST /api/v1/:user_id/projects/:project_id/palettes', () => {
    it('should return a status of 201 and add a new palette to the database', async () => {
      let expectedUser = await database('users').first();
      const user_id = expectedUser.id
      let expectedProject = await database('projects')
        .select()
        .where('project_name', 'winter')
      const newPalette = {
        palette_name: "christmas-colors",
        project_id: expectedProject[0].id,
        color1: "#FF1D15",
        color2: "#E13700",
        color3: "#2F632F",
        color4: "#3EC300",
        color5: "#00991C"
      }

      const response = await request(app)
        .post(`/api/v1/${user_id}/projects/${expectedProject.id}/palettes`)
        .send(newPalette)
      const palettes = await database('palettes')
        .where('id', response.body.id)
        .select()
      const palette = palettes[0]

      expect(response.status).toBe(201);
      expect(palette.palette_name).toEqual(newPalette.palette_name)
      expect(palette.project_id).toEqual(newPalette.project_id)
      expect(palette.color1).toEqual(newPalette.color1)
    });
    
    it('should return a status of 422 and the message "POST failed, missing the required key:"', async () => {
      let expectedProject = await database('projects')
        .select()
        .where('project_name', 'winter')
      
      const newPalette = {
        palette_name: "christmas-colors",
        project_id: expectedProject[0].id,
        color1: "#FF1D15",
        color2: "#E13700",
        color3: "#2F632F",
        color4: "#3EC300",
      }
 
      const response = await request(app)
        .post(`/api/v1/${expectedProject[0].user_id}/projects/${expectedProject[0].id}/palettes`)
        .send(newPalette)

      expect(response.status).toBe(422)
      expect(response.text.includes("POST failed, missing the required key: color5")).toBe(true)
    })
  });

  describe('DELETE /api/v1/:user_id/projects/:project_id', () => {
    it('should return a status code of 204 when successfully deleted', async () => {
      const expectedProject = await database('projects').first()
    
      const response = await request(app)
        .delete(`/api/v1/${expectedProject.user_id}/projects/${expectedProject.id}`)
    
      const checkForDeletion = await database('projects').first()
      const palettesAfter = await database('palettes')
        .where({ project_id: expectedProject.id})

      expect(response.status).toBe(204)
      expect(checkForDeletion.id).not.toBe(expectedProject.id)
      expect(palettesAfter.length).toBe(0)
    });

    it('should return a status code of 404 when requested item to delete cannot be found', async () => {
      let expectedProject = await database('projects').first()

      const response = await request(app)
        .delete(`/api/v1/${expectedProject.user_id}/projects/${expectedProject.id + 100}`)
        
        expect(response.status).toBe(404)
        expect(response.body.error.includes("Could not find project")).toBe(true)
      });

    describe('DELETE /api/v1/:user_id/projects/:project_id/palettes/:palette_id', () => {
      it('should return a status of 204 when successfully deleted', async () => {
        const expectedPalette = await database('palettes').first()
        // console.log(expectedPalette)
        const expectedUser = await database('projects')
          .where({ id: expectedPalette.project_id })
        
        const response = await request(app)
          .delete(`/api/v1/${expectedUser[0].user_id}/projects/${expectedPalette.project_id}/palettes/${expectedPalette.id}`)

        const checkForDeletion = await database('palettes')
          .where({id: expectedPalette.id})
        
        expect(response.status).toBe(204)
        expect(checkForDeletion.length).toBe(0)
      });
    });
  });



  
});

