const express = require("express");
const router = express.Router();
const company = require('../controllers/company.controller');
const {upload} = require("../middlewares/multer.middleware");

const uploadSingleImage = upload.single('logo');
const uploadMiddleware = (req, res, next) => {
    uploadSingleImage(req, res, (err) => {
        if(err){
            return res.status(400).json({message: err.message});
        }

        next();
    })
}


router.post('/', uploadMiddleware ,company.create);
router.post("/login", company.login)
router.post("/get-file", company.getFile);
router.get('/', company.findAll);
router.get('/:id', company.findOne);
router.put("/:id", uploadMiddleware, company.update);
router.delete("/:id", company.delete);

module.exports = router;