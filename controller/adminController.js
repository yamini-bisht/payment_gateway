const request = require('request');
const Promise = require('bluebird');
const Joi = require('joi');

const moment = require('moment');
const adminServices            =   require('../services/adminServices');
const response = require('../responses');
const constants = require('../constants');

const apiReferenceModule = 'admin';

exports.adminControllerSignUp              = adminControllerSignUp;
exports.adminControllerLogin               = adminControllerLogin;
exports.addItemConroller                   = addItemConroller;

function adminControllerSignUp(body, res) {
    Promise.coroutine(function* () {
        let insertObj = {
            first_name  :   body.first_name,
            last_name   :   body.last_name,
            email       :   body.email,
            password    :   body.password,
            username    :   body.username,
            phone_number:   body.phone_number
        }
        let insert = yield adminServices.adminServicesSignUp(insertObj);
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

function adminControllerLogin(body, res) {

    Promise.coroutine(function* () {
        let fetch = yield adminServices.fetchAdminDataFromTable(body.email, body.password);
        if(fetch){
            let accessToken = Math.random().toString(36).slice(2);
            let insertAccessToken = yield adminServices.updateAdminDataFromTable( accessToken, body.email, body.password);
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

function addItemConroller(body, res) {
    Promise.coroutine(function* () {
        let insertObj = {
            item_name  :   body.item_name,
            item_price   :   body.item_price,
            quantity       :   body.quantity,
            description    :   body.description
        }
        let insert = yield adminServices.addItemServices(insertObj);
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