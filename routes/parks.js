const express = require('express'),
    router = express.Router(),
    ParksModel = require('../models/parks');

router.get('/', async (req, res, next) => {
    const parkData = await ParksModel.getAll();
    
    res.render('template', {
        locals: {
            title: 'List of Parks',
            parkData: parkData
        },
        partials: {
            partial: 'partial-index'
        }
    });
});

router.get('/:park_id?', async (req, res, next) => {
    const parkId = req.params.park_id;
    const parkData = await ParksModel.getById(parkId);
    const reviewData = await ParksModel.getReviewsById(parkId);
    
    res.render('template', {
        locals: {
            title: parkData.name,
            parkData: parkData,
            reviewData: reviewData
        },
        partials: {
            partial: 'partial-single-park'
        }
    });
});

module.exports = router;
