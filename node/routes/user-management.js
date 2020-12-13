const router = require('express').Router();
const bodyParser = require('body-parser');

const User = require('../models/user-model');

var jsonParser = bodyParser.json();


var adminCheck = (req, res, next) => {
    if (req.user && req.user.admin === true) next();
    else return res.json({ error: true });
}


router.get('/get-users', adminCheck, (req, res) => {
    User.find({registered: true}, { email: 1, _id: 0, phone: 1, address: 1, first_name: 1, last_name: 1, admin: 1 }).then(users => {
        
        let index = users.map((e) => { return e.admin; }).indexOf(true);
        if (index > -1) users.splice(index, 1);

        res.json(users);
    }).catch(err => {
        return res.json({error: true});
    });
});

router.get('/get-users/:query', adminCheck, (req, res) => {
    let query = req.params.query;
    User.find({first_name: {$regex: '^'+query, $options: 'i'}, registered: true}, { email: 1, _id: 0, phone: 1, address: 1, first_name: 1, last_name: 1, admin: 1 }).then(users => {
        let index = users.map((e) => { return e.admin; }).indexOf(true);
        if (index > -1) users.splice(index, 1);
        
        res.json(users);
    }).catch(err => {
        if (err) return res.json({ error: true });
    });
});




router.get('/user-requests', adminCheck, (req, res) => {
    User.find({ registered: false, rejected: false }, { email: 1, first_name: 1, last_name: 1 }).then(users => {
        if (!users) return res.json({ users: false });
        return res.json(users);
    }).catch(err => {
        if (err) return res.json({ error: true });
    });
});



router.post('/user-request-accept', adminCheck, jsonParser, (req, res) => {
    let email = req.body.email;
    if (!email) return res.json({ error: true });

    User.findOne({ email: email }).then(user => {
        if (!user) return res.json({ error: true });
        user.updateOne({ registered: true }).then(() => {
            return res.json({ accepted: true });
        })
            .catch(err => {
                if (err) return res.json({ error: true });
            });
    }).catch(err => {
        if (err) return res.json({ error: true });
    });
});


router.post('/user-request-reject', adminCheck, jsonParser, (req, res) => {
    let email = req.body.email;
    if (!email) return res.json({ error: true });

    User.findOne({ email: email }).then(user => {
        if (!user) return res.json({ error: true });
        user.updateOne({ registered: false, rejected: true }).then(() => {
            return res.json({ rejected: true });
        })
            .catch(err => {
                if (err) return res.json({ error: true });
            });
    }).catch(err => {
        if (err) return res.json({ error: true });
    });
});


module.exports = router;