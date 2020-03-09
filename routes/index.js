const express = require('express'),
  router = express.Router(),
  ParksModel = require('../models/parks');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const parkList = await ParksModel.getAll();

  res.render('template', {
    locals: {
      title: 'Time to shred bruh!',
      parkData: parkList,
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

module.exports = router;
