const db = require('../models');
const Advertisement = db.Advertisement;
const Op = db.Sequelize.Op;
const index = require('./index');
const moment = require('moment');
moment.suppressDeprecationWarnings = true;

exports.create = async (req, res) => {

    let obligatoryData = ["title", "experience", "description", "location", "type", "remote", "salarie", "active", "isPartTime", "companyId"];

    for await (const element of obligatoryData) {
        let result = req.body.hasOwnProperty(element);
        if (!result) {
            return res.status(400).json(`${element} is not defined`);
        }
    }

    Advertisement.create(req.body)
        .then(data => {
            res.status(200).send(data);
        })


}

exports.findOne = (req, res) => {
    index.findOne(req, res, Advertisement)
}

exports.findAll = (req, res) => {
    index.findAll(req, res, Advertisement)
}

exports.update = (req, res) => {
    index.update(req, res, Advertisement)
}

exports.delete = (req, res) => {
    index.delete(req, res, Advertisement);
}

exports.getAdsByCompany = (req, res) => {
    Advertisement.findAll({ where: { companyId: req.params.id }}).then(data => {
        if(!data) { return res.status(404); }
        return res.send(data);
    });
}

exports.searchBar = (req, res) => {

    const date = new Date();

    let title = req.body.title;
    let location = req.body.location;
    let createdAt = req.body.createdAt;

    if (title === ""){
        delete req.body.title
    } else if (title){
        req.body.title = {[Op.like]: "%" + req.body.title + "%"};
    }
    if (location === ""){
        delete req.body.location;
    } else if (location){
        req.body.location = {[Op.like]: "%" + req.body.location + "%"};
    }

    console.log(req.body);
    if (createdAt){
        console.log("actual time", moment().local());
        switch (createdAt) {
            case 'Today':
                console.log(moment().subtract(1, 'days'))
                req.body.createdAt = {[Op.gt]: moment().subtract(1, 'days')};
                break;
            case '1 week':
                req.body.createdAt = {[Op.gt]: moment().subtract(1, 'weeks')};
                break;
            case '1 month':
                req.body.createdAt = {[Op.gt]: moment().subtract(1, 'month')};
                break;
            case '3 months':
                req.body.createdAt = {[Op.gt]: moment().subtract(3, 'month')};
                break;
        }
    }

    if(!req.body.remote){
        delete req.body.remote;
    }

    if(!req.body.isPartTime){
        delete req.body.isPartTime;
    }

    Advertisement.findAll({where: req.body })
        .then(data => {
            return res.status(200).send(data);
        })
}