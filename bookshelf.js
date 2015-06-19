var pg = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

var bookshelf = require('bookshelf')(pg);

module.exports = bookshelf;
