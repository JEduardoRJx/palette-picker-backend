// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/tone_zone',
   migrations: {
      directory: './db/migrations'
    },
seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/tone_zone_test',
   migrations: {
      directory: './db/migrations'
    },
seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  }
};