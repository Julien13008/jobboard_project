const db = require('../models');
const Admin = db.Admin;
const Op = db.Sequelize.Op;
const index = require('./index');

exports.create = async (req, res) => {
    if (!req.body?.email || !req.body?.username || !req.body?.password) {
        return res.status(400).send("Missing data");
    }

    await index.register(req, res, Admin)
}

exports.findOne = (req, res) => {
    index.findOne(req, res, Admin)
}

exports.findAll = (req, res) => {
    index.findAll(req, res, Admin)
}

exports.update = (req, res) => {
    index.update(req, res, Admin)
}

exports.delete = (req, res) => {
    index.delete(req, res, Admin);
}

exports.login = (req, res) => {
    index.login(req, res, Admin);
}