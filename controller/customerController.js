const request = require('request');
const Promise = require('bluebird');
const Joi = require('joi');
const config          = require('config');
const stripe = require("stripe")(config.get('stripe_secret_key'));
const stripePublicKey = require("stripe")(config.get('stripe_publishable_key'));

const customerServices = require('../services/customerServices');
const response = require('../responses');
const constants = require('../constants');
const commonFunction = require('../commonFunction');

const apiReferenceModule = 'Customer';

exports.customerSignUp = customerSignUp;
exports.customerLogin = customerLogin;
exports.addCardController = addCardController;
exports.showItemController  = showItemController;

function customerSignUp(body, res) {
    Promise.coroutine(function* () {
        let insertObj = {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: body.password,
            username: body.username,
            phone_number: body.phone_number
        }
        let insert = yield customerServices.customerSignUp(insertObj);
        if (insert.affectedRows == 1) {
            return "Data successfully inserted";
        }
    })().then(result => {
        return response.actionCompleteResponse(res, result);
    }).catch(error => {
        console.log("error", error);
        return response.sendActionFailedResponse(res, [], error.message, error.status_code);
    });
}

function customerLogin(body, res) {
    Promise.coroutine(function* () {
        let fetch = yield customerServices.fetchCustomerDataFromTable(body.email, body.password);
        if(fetch){
            let accessToken = Math.random().toString(36).slice(2);
            let insertAccessToken = yield customerServices.updateCustomerDataFromTable( accessToken, body.email, body.password);
            let data = {
                username    : fetch[0].username,
                email       : fetch[0].email
            }
            return data;
        }
    })().then(result => {
        return response.actionCompleteResponse(res, result);
    }).catch(error => {
        console.log("error", error);
        return response.sendActionFailedResponse(res, [], error.message, error.status_code);
    });
}

function addCardController(body, res) {
    Promise.coroutine(function* () {
        let insertObj = {
            card_number: body.card_number,
            expiry_month: body.expiry_month,
            expiry_year: body.expiry_year,
            cvc: body.cvc,
            user_id: body.user_id,
            card_type: body.card_type
        }
        let createStripeToken = yield commonFunction.createToken(insertObj, res);
        if(!createStripeToken){
            return "card invaid";
        }
        insertObj.card_number = insertObj.card_number.slice(-4);
        insertObj.token = createStripeToken.id;
        let insert = yield customerServices.addCardServices(insertObj);
        if (insert.affectedRows == 1) {
            return "Data successfully inserted";
        }
    })().then(result => {
        return response.actionCompleteResponse(res, result);
    }).catch(error => {
        console.log("error", error);
        return response.sendActionFailedResponse(res, [], error.message, error.status_code);
    });
}

function showItemController(body, res) {
    Promise.coroutine(function* () {
        let fetch = yield customerServices.showItemServices(body, res);
        return fetch;
    })().then(result => {
        return response.actionCompleteResponse(res, result);
    }).catch(error => {
        console.log("error", error);
        return response.sendActionFailedResponse(res, [], error.message, error.status_code);
    });
}