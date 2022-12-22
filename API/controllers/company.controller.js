const db = require('../models');
const Company = db.Company;
const index = require('./index');
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    // Verification & Hash password

    if(req.file){
        req.body.logo = encodeURIComponent(req.file.originalname.trim());
    }

    if (!req.body?.email || !req.body?.name || !req.body?.password) {
        return res.status(400).json({message: "Email, name or password doesn't exist"});
    }

    await index.register(req, res, Company);
}

exports.findOne = (req, res) => {
    index.findOne(req, res, Company);
}

exports.findAll = (req, res) => {
    index.findAll(req, res, Company);
}

exports.update = (req, res) => {

    if(req.file){
        req.body.logo = req.file.originalname
    }

    index.update(req, res, Company);
}

exports.delete = (req, res) => {
    index.delete(req, res, Company);
}

exports.login = (req, res) => {
    index.login(req, res, Company);
}

exports.getFile = (req, res) => {
    index.getFile(req, res, Company);
}