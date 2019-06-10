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
      is_logged_in: req.session.is_logged_in,
      first_name: req.session.first_name
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

router.get('/return', (req, res, next) => {
  console.log('res', res.profile);
  res.sendStatus(200);
})

module.exports = router;
