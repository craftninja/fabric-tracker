var pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING
});

var bookshelf = require('bookshelf')(pg);

module.exports = bookshelf;
