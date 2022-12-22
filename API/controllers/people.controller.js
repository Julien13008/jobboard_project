const db = require('../models');
const bcrypt = require("bcrypt");
const People = db.People;
const Op = db.Sequelize.Op;
const index = require('./index');

exports.create = async (req, res) => {

    req.body = JSON.parse(JSON.stringify(req.body));
    req.files = JSON.parse(JSON.stringify(req.files));

    let obligatoryData = ["name", "firstName", "email", "password"];
    checkFilesExist(req, res);

    for await (const element of obligatoryData) {
        let result = req.body.hasOwnProperty(element);
        if (!result) {
            return res.status(400).json(`${element} is not defined`);
        }
    }
    await index.register(req, res, People);
}

exports.findOne = (req, res) => {
    index.findOne(req, res, People)
}

exports.findAll = (req, res) => {
    index.findAll(req, res, People)
}

exports.update = (req, res) => {
    checkFilesExist(req, res)
    index.update(req, res, People)
}

exports.delete = (req, res) => {
    index.delete(req, res, People)
}

exports.login = (req, res) => {
    index.login(req, res, People);
}

exports.getFile = (req, res) => {
    index.getFile(req, res, People);
}


function checkFilesExist(req, res) {
    if(Object.entries(req.files).length > 0){
        if(req.files?.CV){
            req.body.CV = encodeURIComponent(req.files.CV[0].originalname.trim());
        }
        if(req.files?.profilePicture){
            req.body.profilePicture = encodeURIComponent(req.files.profilePicture[0].originalname.trim());
        }
    }
}

