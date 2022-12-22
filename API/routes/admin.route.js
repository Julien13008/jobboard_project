const express = require("express");
const router = express.Router();
const admin = require('../controllers/admin.controller');

router.post('/', admin.create);
router.get('/', admin.findAll);
router.post('/login', admin.login)
router.get('/:id', admin.findOne);
router.put("/:id", admin.update);
router.delete("/:id", admin.delete);

module.exports = router;