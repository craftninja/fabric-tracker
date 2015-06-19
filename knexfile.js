process.env.DATABASE_URL || require('./.env')

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
