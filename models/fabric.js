var bookshelf = require('../bookshelf');

var Fabric = bookshelf.Model.extend({
  tableName: 'fabrics'
});

module.exports = Fabric;
