const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = async (req, res, model) => {

    let isEmailExist = await model.findOne({where: {email: req.body.email}});

    if (isEmailExist) {
        return res.status(400).json({message: "Email already exist"});
    }

    if(req.body.password.length < 6){
        return res.status(400).json({message: "Password need to have more than 6 characters"})
    }

    if(req.body.password != req.body.confirmPassword){
        return res.status(400).send("Password isn't the same")
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            req.body.password = hash;

            model.create(req.body)
                .then(data => {
                    res.send(data);
                })
        });
    })
}

exports.create = (req, res, model) => {

    model.create(req.body).then(data => {
        res.send(data);
    })
}

exports.findOne = (req, res, model) => {
    const id = req.params.id;
    model.findByPk(id).then(data => {
        if(data){
            res.send(data);
        } else {
            res.status(400).json({message: "Not found"})
        }
    }).catch(() => {
        res.status(400).json({message: "Not found"})
    })
}

exports.findAll = (req, res, model) => {
    model.findAll()
        .then(data => {
            res.send(data);
        })
}

exports.update = (req, res, model) => {
    model.update(req.body, {where: {id: req.params.id}})
        .then(data => {
            res.send(req.body)
        });
}

exports.delete = (req, res, model) => {
    model.destroy({where: {id: req.params.id}})
        .then(data => {
            res.send(`${req.params.id} deleted successfully !`)
        })
}

exports.login = (req, res, model) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email && password){
        model.findOne({where: {email: req.body.email}})
            .then(data => {
                if(data){
                    bcrypt.compare(req.body.password, data.password, (err, response) => {
                        if(response){
                            let token = jwt.sign({email: data.email, id: data.id}, "AZERTYUIOP");

                            return res.send(token)
                        } else {
                            return res.status(401).json({message: "Password is incorrect"})
                        }
                    })
                } else {
                    return res.status(401).json({message: `${model.name} not found`})
                }
            })
    } else {
        return res.status(401).json({message: "Please enter email and password"});
    }
}

exports.decodeJwt = (req, res) => {
    let token = jwt.decode(req.body.token, {});

    return res.status(200).send(token);
}

exports.getFile = (req, res, model) => {

    model.findOne({where: {email: req.body.email}})
        .then(data => {
            if(data?.email){
                return res.send(`http://localhost:3000/static/${req.body.entity}/${data.email}/`);
            } else {
                return res.status(400).json({message: "Email not found"});
            }
        })



}