const { check, validationResult } = require('express-validator');

const validationRules = () => {
    return [
        check('firstName').not().isEmpty().withMessage('First name is required').isAlpha().withMessage('First name is not valid')
        ,
        check('lastName').not().isEmpty().withMessage('Last name is required').isAlpha().withMessage('Last name is not valid'),
        check('address').not().isEmpty().withMessage('Address is required').isAlphanumeric().withMessage('Address is not valid'),
        check('phone').not().isEmpty().withMessage('Phone number is required').isInt().isLength({ min: 10, max: 10 }).withMessage('Phone number is not valid'),
        check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
        check('password').not().isEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password is not valid'),
        check('confPassword').not().isEmpty().withMessage('Confirm Password Office is required').isLength({ min: 6 }).withMessage('Password is not valid')
    ]
}


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.json({
        msg: extractedErrors
    });
};

const changer = (req, res, next) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var address = req.body.address;

    req.body.firstName = req.body.firstName.replace(/ /g, 'S');
    req.body.lastName = req.body.lastName.replace(/ /g, 'S');
    req.body.address = req.body.address.replace(/ /g, 'S');
    req.body.address = req.body.address.replace(/,/g, '1');

    req.firstName = firstName;
    req.lastName = lastName
    req.address = address;

    next();
};


const reChanger = (req, res, next) => {
    req.body.firstName = req.firstName;
    req.body.lastName = req.lastName;
    req.body.address = req.address;

    next();
};


module.exports = { validationRules, validate, changer, reChanger }