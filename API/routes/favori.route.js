const express = require("express");
const router = express.Router();
const favori = require('../controllers/favori.controller');

router.post('/', favori.create);
router.get('/', favori.findAll);
router.get("/advertisement/:id", favori.findFavoriteByAdvertisement);
router.put('/:id', favori.update)
router.get('/:id', favori.findOne);
router.delete("/:id", favori.delete);
router.get("/people/:id", favori.findFavoriteByPeople);

module.exports = router;