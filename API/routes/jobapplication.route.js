const express = require("express");
const router = express.Router();
const jobApplication = require('../controllers/jobapplication.controller');
const {upload} = require("../middlewares/multer.middleware");

const uploadSinglePdf = upload.single('motivationLetter');
const uploadMiddleware = (req, res, next) => {

    uploadSinglePdf(req, res, (err) => {
        if (err) { return res.status(400).json({message: err.message}); }
        next();
    })
}

router.post('/', uploadMiddleware, jobApplication.create);
router.get('/', jobApplication.findAll);
router.get('/:id', jobApplication.findOne);
router.put("/:id", uploadMiddleware, jobApplication.update);
router.delete("/:id", jobApplication.delete);
router.get("/advertisement/:id", jobApplication.findJobApplicationByAdvertisement);
router.get("/people/:id", jobApplication.findJobApplicationByPeople);

module.exports = router;