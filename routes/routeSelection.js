var express = require('express');
var router = express.Router();
var bus = require('../models/Buses');


router.post('/', (req, res) => {

    bus.find({ 'startCity': req.body.startCity, 'destination': req.body.destination }).exec((err, bus) => {
        if (err) {
            res.json({ status: false, message: "Error While Searching" })
        }
        else res.json({ bus })
    })
})

router.post('/', (req, res) => {

    bus.findOne({ _id: req.body.bId }, (err, bus) => {
        if (err) {
            res.json({ status: false, message: "Error While Searching With ID" })
        }
        else
            res.json({ bus })
    })
})


module.exports = router;
