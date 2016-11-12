var express = require('express');
var router = express.Router();

/* GET members listing. */
router.get('/', function(req, res, next) {
	  res.render('map', { title: 'The Netwok' });
});

module.exports = router;
