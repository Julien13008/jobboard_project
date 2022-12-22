const db = require('../models');
const index = require('./index');
const JobApplication = db.JobApplication;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {

    req.body = JSON.parse(JSON.stringify(req.body));
    if(req.files){
        req.files = JSON.parse(JSON.stringify(req.files));
        checkFilesExist(req, res);
    }

    let obligatoryData = ["status", "advertisementId", "peopleId"];

    for await (const element of obligatoryData) {
        let result = req.body.hasOwnProperty(element);
        if (!result) { return res.status(400).json(`${element} is not defined`); }
    }
    await index.create(req, res, JobApplication);
}

exports.findOne = (req, res) => {
    index.findOne(req, res, JobApplication)
}

exports.findAll = (req, res) => {
    index.findAll(req, res, JobApplication)
}

exports.update = (req, res) => {
    if(req.file){
        req.file = JSON.parse(JSON.stringify(req.file));
        checkFilesExist(req, res);
    }

    index.update(req, res, JobApplication)
}

exports.delete = (req, res) => {
    index.delete(req, res, JobApplication);
}

exports.findJobApplicationByPeople = (req, res) => {
    JobApplication.findAll({where: {peopleId: req.params.id}}).then(data => {
        if (!data) {
            return res.status(404);
        }
        return res.send(data);
    });
}

exports.findJobApplicationByAdvertisement = (req, res) => {
    JobApplication.findAll({where: {advertisementId: req.params.id}}).then(data => {
        if (!data) {
            return res.status(404);
        }
        return res.send(data);
    });
}


function checkFilesExist(req, res) {
    if(Object.entries(req.file).length > 0){
        if(req.file){
            req.body.motivationLetter = req.file.originalname;
        }
    }
}

