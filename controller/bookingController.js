const request           = require('request');
const Promise           = require('bluebird');
const Joi               = require('joi');
const config          = require('config');
const stripe          = require("stripe")(config.get('stripe_secret_key'));
const stripePublicKey = require("stripe")(config.get('stripe_publishable_key'));

const bookingServices = require('../services/bookingServices');
const response        = require('../responses');
const constants       = require('../constants');
const commonFunction  = require('../commonFunction');

const apiReferenceModule= 'Booking';

exports.createBookingController = createBookingController;
exports.showBookingController = showBookingController;

function createBookingController(body, res) {
    Promise.coroutine(function* () {
        let itemId = body.item_id;
        let userId = body.user_id;
        let cardId = body.card_id;
        let getUserDetails = yield bookingServices.getCustomerDetails(userId);
        let getCardDetails = yield bookingServices.getCardDetails(cardId);
        if (!getCardDetails) {
            return "user not found"
        }
        if (!getCardDetails) {
            return "please add card details!"
        }
        let getItemDetails = yield bookingServices.getItemDetails(itemId);
        if (!getItemDetails) {
            return "item not found"
        }
        let createStripeCustomer = yield commonFunction.createCustomer(getCardDetails[0].token, res);
        let charge= {
            price: getItemDetails[0].item_price,
            id : createStripeCustomer.id
        }
        let chargeCustomer = yield commonFunction.createCharges(charge, res);
        if (chargeCustomer.paid == true) {
            let insert = {
                transaction_id: result.id,
                customer_id: userId,
                item_id: itemId,
                card_id: cardId,
                status: "PAID"
            }
            yield bookingServices.insertBookingDetails(insert);
            return "payment complete";
        }
        else {
            let insertB = {
                transaction_id: result.id,
                customer_id: userId,
                item_id: itemId,
                card_id: cardId,
                status: "FAILED"
            }
            yield bookingServices.insertBookingDetails(insertB);
            throw Error ("payment failed");
        }

    })().then(result => {
        return response.actionCompleteResponse(res, result);
    }).catch(error => {
        console.log("error", error);
        return response.sendActionFailedResponse(res, [], error.message, error.status_code);
    });
}

function showBookingController(body, res) {
    Promise.coroutine(function* () {
        let fetch = yield bookingServices.showBookingServices(body, res);
        return fetch;
    })().then(result => {
        return response.actionCompleteResponse(res, result);
    }).catch(error => {
        console.log("error", error);
        return response.sendActionFailedResponse(res, [], error.message, error.status_code);
    });
}