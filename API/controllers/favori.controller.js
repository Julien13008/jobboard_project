const db = require('../models');
const Favori = db.Favori;
const Op = db.Sequelize.Op;
const index = require('./index');

exports.create = async (req, res) => {

    // Verification & Hash password
    Favori.create(req.body)
        .then(data => {
            res.send(data);
        })

}

exports.findOne = (req, res) => {
    index.findOne(req, res, Favori)
}

exports.findAll = (req, res) => {
    index.findAll(req, res, Favori)
}

exports.update = (req, res) => {
    index.update(req, res, Favori);
}

exports.delete = (req, res) => {
    index.delete(req, res, Favori);
}

exports.findFavoriteByPeople = (req, res) => {
    Favori.findAll({ where: { peopleId: req.params.id }}).then(data => {
        if(!data) { return res.status(404); }
        return res.send(data);
    });
}

exports.findFavoriteByAdvertisement = (req, res) => {
    Favori.findAll({ where: { advertisementId: req.params.id }}).then(data => {
        if(!data) { return res.status(404); }
        return res.send(data);
    });
}
