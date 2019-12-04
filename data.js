// Sample data to seed and use for testing

const users = [
  {
    id: 1,
    username: 'username',
    password: 'password'
  }
]

const projects = [
  {
    id: 1,
    project_name: 'fall',
    user_id: 1
  },
  {
    id: 2,
    project_name: 'winter',
    user_id: 1
  },
  {
    id: 3,
    project_name: 'spring',
    user_id: 1
  },
  {
    id: 4,
    project_name: 'summer',
    user_id: 1
  }
]

const palettes = [
  {
    id: 1,
    palette_name: 'fall colors',
    project_id: 1,
    color1: '#CECCCC',
    color2: '#9D6381',
    color3: '#FDECEF',
    color4: '#0F110C',
    color5: '#612940'
  }, {
    id: 2,
    palette_name: 'winter colors',
    project_id: 2,
    color1: '#CECCCC',
    color2: '#9D6381',
    color3: '#FDECEF',
    color4: '#0F110C',
    color5: '#612940'
  }, {
    id: 3,
    palette_name: 'spring colors',
    project_id: 3,
    color1: '#CECCCC',
    color2: '#9D6381',
    color3: '#FDECEF',
    color4: '#0F110C',
    color5: '#612940'
  }, {
    id: 4,
    palette_name: 'summer colors',
    project_id: 4,
    color1: '#CECCCC',
    color2: '#9D6381',
    color3: '#FDECEF',
    color4: '#0F110C',
    color5: '#612940'
  }
]

module.exports = {
  users,
  projects,
  palettes
}