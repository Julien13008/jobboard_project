const express = require("express");
const router = express.Router();
const index = require('../controllers/index.js');


router.use('/admin', require('./admin.route'));
router.use('/message', require('./message.route'));
router.use('/job-application', require('./jobapplication.route'));
router.use("/company", require('./company.route'));
router.use("/advertisement", require('./advertisement.route'));
router.use("/favori", require('./favori.route'));
router.use('/people', require('./people.route'));

router.post("/decode", index.decodeJwt)

module.exports = router