const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const User = require('../models/user-model');

var jsonParser = bodyParser.json();


router.post('/login', jsonParser, (req, res) => {

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            if (user.rejected === true) return res.json({ rejected: true });
            if (user.registered === false) return res.json({ registered: false });
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) return res.json({ login: false, error: true });
                if (result) {
                    req.login(user, err => {
                        if (err) return res.json({ login: false, error: true });
                        if (user.admin === true) return res.json({ login: true, admin: true });
                        res.json({ login: true });
                    });
                } else {
                    res.json({ login: false, password: false });
                }
            });

        } else {
            return res.json({ login: false, email: false })
        }

    });

});

module.exports = router;