const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')



exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Bad credenitals"
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Bad credenitals"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id,
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }

                    )
                    return res.status(200).json({
                        message: 'Auth succesful',
                        token: token
                    })
                }
                res.status(401).json({
                    message: "Bad credenitals"
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        })
                        user
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}

exports.delete = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}