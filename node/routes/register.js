const router = require('express').Router();
const bodyParser = require('body-parser');

const User = require('../models/user-model');
const { validationRules, validate, changer, reChanger } = require('../config/validator');

var jsonParser = bodyParser.json();

router.post('/', jsonParser, changer, validationRules(), validate, reChanger, (req, res) => {

    User.findOne({ email: req.body.email }).then(user => {
        if (user) return res.json({ register: false, userExists: true });

        if (!user) {
            let adminEmail = 'admin@admin.com';
            let newUser = new User({
                email: req.body.email,
                password: req.body.password,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                phone: req.body.phone,
                address: req.body.address,
                admin: req.body.email === adminEmail ? true : false,
                registered: req.body.email === adminEmail ? true : false 
            });

            newUser.save((err, result) => {
                if (err) {
                    return res.json({ register: false, error: err })
                };
                res.json({ register: true, admin: result.admin });
            });
        }
    });

});


router.get('/email-exists-check/:email', (req, res) => {

    User.findOne({ email: req.params.email }).then(user => {
        if (user) return res.json({ exists: true });
        else res.json({ exists: false });
    });

});

module.exports = router;