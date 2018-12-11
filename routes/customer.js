const request = require('request');
const Promise = require('bluebird');
const Joi = require('joi');

const customerController          =   require('../controller/customerController');
const response = require('../responses');
const constants = require('../constants');

const apiReferenceModule = 'Customer';

exports.customerSignUp              = customerSignUp;
exports.customerLogin               = customerLogin;
exports.addCard                     = addCard;
exports.showItem                    = showItem;

function customerSignUp(req, res) {
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let email = req.body.email;
    let password = req.body.password;
    let userName = req.body.username;
    let phoneNumber = req.body.phone_number;

    let schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().optional(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        userName: Joi.any().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        phoneNumber: Joi.number().required()
    });

    let validateReq = Joi.validate({ firstName, lastName, email,  password, userName, phoneNumber}, schema);
    if (validateReq.error) {
        console.log(validateReq.error);
        return response.parameterMissingResponse(res, "", []);
    }
    customerController.customerSignUp(req.body, res);
}

function customerLogin(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    });

    let validateReq = Joi.validate({ email,  password}, schema);
    if (validateReq.error) {
        console.log(validateReq.error);
        return response.parameterMissingResponse(res, "", []);
    }
    customerController.customerLogin(req.body, res);
}

function addCard(req, res) {
    let cardNumber = req.body.card_number;
    let expiryMonth = req.body.expiry_month;
    let expiryYear = req.body.expiry_year;
    let cvc = req.body.cvc;
    let userId = req.body.user_id;
    let cardType = req.body.card_type;

    let schema = Joi.object().keys({
        cardNumber: Joi.string().required(),
        expiryMonth: Joi.string().required(),
        expiryYear: Joi.string().required(),
        cvc: Joi.any().required(),
        userId: Joi.string().required(),
        cardType: Joi.string().required()
    });

    let validateReq = Joi.validate({ cardNumber, expiryMonth, expiryYear,  userId, cvc, cardType}, schema);
    if (validateReq.error) {
        console.log(validateReq.error);
        return response.parameterMissingResponse(res, "", []);
    }
    customerController.addCardController(req.body, res);
}

function showItem(req, res) {
    customerController.showItemController(req.body, res);
}