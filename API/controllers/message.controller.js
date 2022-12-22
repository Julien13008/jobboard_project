const db = require('../models');
const Message = db.Message;
const Op = db.Sequelize.Op;
const index = require('./index');

exports.create = (req, res) => {
    if(!req.body?.message || !req.body?.peopleId || !req.body?.companyId || !req.body?.advertisementId ){
        return res.status(400).send("Missing data");
    }

    Message.create(req.body).then(data => { res.status(201).send(data); })
}

exports.findOne = (req, res) => {
    index.findOne(req, res, Message)
}

exports.findAll = (req, res) => {
    index.findAll(req, res, Message)
}

exports.update = (req, res) => {
    index.update(req, res, Message);
}

exports.delete = (req, res) => {
    index.delete(req, res, Message);
}

exports.getMessagesByPeople = (req, res) => {
    Message.findAll({where: {peopleId: req.params.id}})
        .then(data => {
            res.status(200).send(data);
        })
}

exports.getMessagesByCompany = (req, res) => {
    Message.findAll({where: {companyId: req.params.id}})
        .then(data => {
            res.status(200).send(data);
        })
}

exports.getMessagesByAds = (req, res) => {
    Message.findAll({where: {advertisementId: req.params.id}})
        .then(data => {
            res.status(200).send(data);
        })
}