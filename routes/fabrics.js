var express = require('express');
var router = express.Router();
var Fabric = require('../models/fabric');

router.get('/', function(req, res, next) {
  Fabric.collection().fetch().then(function(fabrics) {
    res.render('fabrics/index', {fabrics: fabrics.toJSON()});
  });
});

module.exports = router;
