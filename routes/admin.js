const request = require('request');
const Promise = require('bluebird');
const Joi = require('joi');
const moment = require('moment');

const adminController             =   require('../controller/adminController');

const apiReferenceModule = 'admin';

exports.adminSignUp              = adminSignUp;
exports.adminLogin               = adminLogin;
exports.addItem                  = addItem;

function adminSignUp(req, res) {
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
    adminController.adminControllerSignUp(req.body, res);
}

function adminLogin(req, res) {
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

    adminController.adminControllerLogin(req.body, res);
}

function addItem(req, res) {
    let itemName = req.body.item_name;
    let itemPrice = req.body.item_price;
    let quantity = req.body.quantity;
    let description = req.body.description;

    let schema = Joi.object().keys({
        itemName: Joi.string().required(),
        itemPrice: Joi.any().required(),
        quantity: Joi.any().required(),
        description: Joi.any().required()
    });

    let validateReq = Joi.validate({ itemName, itemPrice, quantity,  description}, schema);
    if (validateReq.error) {
        console.log(validateReq.error);
        return response.parameterMissingResponse(res, "", []);
    }
    adminController.addItemConroller(req.body, res);
}