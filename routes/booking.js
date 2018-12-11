const request = require('request');
const Promise = require('bluebird');
const Joi = require('joi');
const moment = require('moment');

const bookingController             =   require('../controller/bookingController');
const response = require('../responses');
const constants = require('../constants')

const apiReferenceModule = 'booking';

exports.createBooking              = createBooking;

function createBooking(req, res) {
    let itemId = req.body.item_id;
    let userId = req.body.user_id;
    let cardId = req.body.card_id;

    let schema = Joi.object().keys({
        itemId: Joi.string().required(),
        userId: Joi.string().required(),
        cardId: Joi.string().required()
    });

    let validateReq = Joi.validate({ itemId, userId, cardId}, schema);
    if (validateReq.error) {
        console.log(validateReq.error);
        return response.parameterMissingResponse(res, "", []);
    }
    bookingController.createBookingController(req.body, res);
}

function showItem(req, res) {
    bookingController.showBookingController(req.body, res);
}