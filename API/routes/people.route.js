const express = require("express");
const router = express.Router();
const people = require('../controllers/people.controller');
const multer = require('multer');
const fs = require("fs");
const {upload} = require("../middlewares/multer.middleware");
const company = require("../controllers/company.controller");

const uploadSingleImage = upload.fields([{name: 'CV'}, {name: 'profilePicture'}])
const uploadMiddleware = (req, res, next) => {

    uploadSingleImage(req, res, (err) => {
        if (err) {
            return res.status(400).json({message: err.message});
        }

        next();
    })
}

router.post('/', uploadMiddleware, people.create);
router.post('/login', people.login);
router.post("/get-file", people.getFile);
router.get('/:id', people.findOne);
router.get('/', people.findAll);
router.put('/:id', uploadMiddleware, people.update);
router.delete('/:id', people.delete);

module.exports = router;