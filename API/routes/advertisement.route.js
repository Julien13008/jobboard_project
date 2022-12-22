const express = require("express");
const router = express.Router();
const advertisement = require('../controllers/advertisement.controller');

router.post('/', advertisement.create);
router.get('/:id', advertisement.findOne);
router.get('/', advertisement.findAll);
router.put('/:id', advertisement.update);
router.delete('/:id', advertisement.delete);
router.get("/company/:id", advertisement.getAdsByCompany);
router.post('/search', advertisement.searchBar);

module.exports = router;