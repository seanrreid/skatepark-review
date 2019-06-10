const express = require('express'),
    router = express.Router(),
    ParksModel = require('../models/parks');

router.get('/', async (req, res, next) => {
    const parkData = await ParksModel.getAll();
    
    res.render('template', {
        locals: {
            title: 'List of Parks',
            parkData: parkData,
            is_logged_in: req.session.is_logged_in,
            first_name: req.session.first_name,
            user_id: req.session.user_id
        },
        partials: {
            partial: 'partial-index'
        }
    });
});

router.get('/:park_id?', async (req, res, next) => {
    const parkId = req.params.park_id;
    const parkData = await ParksModel.getById(parkId);
    const reviewData = await ParksModel.getParkReviews(parkId);
    
    res.render('template', {
        locals: {
            title: parkData.name,
            parkData: parkData,
            reviewData: reviewData,
            is_logged_in: req.session.is_logged_in,
            first_name: req.session.first_name,
            user_id: req.session.user_id
        },
        partials: {
            partial: 'partial-single-park'
        }
    });
});

module.exports = router;
