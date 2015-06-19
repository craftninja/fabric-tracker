require('./.env')

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING
  }

};
