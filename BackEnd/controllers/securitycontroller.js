require('rootpath')();
const express = require('express');
const app = express()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersModel = require('../models/usersmodel');




function login(req, res) {
    const { username, password } = req.body;


    UsersModel.getUserByUsername(username, (err, user) => {
        if (err) {
            console.error('Error al obtener usuario por username:', err);
            res.status(500).json({ error: 'Error al obtener usuario por username' });
            return;
        }

        if (!user || Object.keys(user).length === 0) {
            res.status(404).json({ error: 'El usuario no existe' });
            return;
        }

        else {
            console.log(user)
            const match = bcrypt.compareSync(password, user.password);


            if (match) {
                let userLogged = {
                    user_id: user.user_id,
                    username: username,
                    email: user.email,
                    rol_id: user.rol_id
                }

                jwt.sign(userLogged, 'secretKey', { expiresIn: '600s' }, (err, token) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send({
                            message: err
                        });
                    } else {
                        res.json({
                            datos: userLogged,
                            token: token
                        });
                    }
                })
            } else {
                res.status(403).send({ message: 'Contraseña incorrecta' });
            }
        };

    });
}

function verifyToken(req, res, next) {
    if (req.headers["Authorization"]) {
        try {
            const token = req.headers["Authorization"];
            const verified = jwt.verify(token, "secretKey");
            if (verified) {
                next();
            } else {
                res.status(403).send({
                    message: "Token inválido"
                });
            }
        } catch (error) {
            res.status(403).send({
                message: "Token inválido"
            });
        }
    } else {
        res.status(403).send({
            message: "No posee token de autorización"
        });
    }
}

module.exports = {
    login,
    verifyToken
}