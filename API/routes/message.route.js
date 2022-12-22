const express = require("express");
const router = express.Router();
const message = require('../controllers/message.controller');

router.post('/', message.create);
router.get('/', message.findAll);
router.get('/:id', message.findOne);
router.get("/people/:id", message.getMessagesByPeople);
router.get('/company/:id', message.getMessagesByCompany);
router.get('/advertisement/:id', message.getMessagesByAds);
router.put("/:id", message.update);
router.delete("/:id", message.delete);

module.exports = router;