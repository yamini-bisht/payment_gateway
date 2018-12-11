const request = require('request');
const Promise = require('bluebird');
const Joi = require('joi');
const config          = require('config');
const stripe = require("stripe")(config.get('stripe_secret_key'));
const stripePublicKey = require("stripe")(config.get('stripe_publishable_key'));

const bookingServices = require('../services/bookingServices');
const response = require('../responses');
const constants = require('../constants');
const commonFunction = require('../commonFunction');

const apiReferenceModule = 'Booking';

exports.getCustomerDetails = getCustomerDetails;
exports.getCardDetails = getCardDetails;
exports.getItemDetails = getItemDetails;
exports.insertBookingDetails = insertBookingDetails;
exports.showBookingServices = showBookingServices;

function getCustomerDetails(userId){
    let stmt = ` SELECT * FROM customers WHERE id = ? `;
    return new Promise((resolve, reject) => {
        let query = connection.query( stmt, [userId], function (error, result) {
            // console.log("this is sql query :- ",query.sql,error)
            if(error){
                return reject(error);
            }
            return resolve (result);
        });
    });
    return DBHandler(apiReference, event, stmt, [insertObj] );
}

function getCardDetails(cardId){
    let stmt = ` SELECT * FROM tb_card_details WHERE id = ? `;
    return new Promise((resolve, reject) => {
        let query = connection.query( stmt, [cardId], function (error, result) {
            // console.log("this is sql query :- ",query.sql,error)
            if(error){
                return reject(error);
            }
            return resolve (result);
        });
    });
    return DBHandler(apiReference, event, stmt, [insertObj] );
}

function getItemDetails(itemId){
    let stmt = ` SELECT * FROM tb_items WHERE id = ? `;
    return new Promise((resolve, reject) => {
        let query = connection.query( stmt, [itemId], function (error, result) {
            // console.log("this is sql query :- ",query.sql,error)
            if(error){
                return reject(error);
            }
            return resolve (result);
        });
    });
    return DBHandler(apiReference, event, stmt, [insertObj] );
}

function insertBookingDetails(data) {
    let stmt = `INSERT INTO tb_bookings SET ?`;
    return new Promise((resolve, reject) => {
    let query = connection.query( stmt, [data], function (error, result) {
        // console.log("this is sql query :- ",query.sql,error)
        if(error){
            return reject(error);
        }
        return resolve (result);
    });
});
return DBHandler(apiReference, event, stmt, [insertObj] );
}

function showBookingServices(data) {
    let stmt = `SELECT * FROM tb_bookings`;
    return new Promise((resolve, reject) => {
    let query = connection.query( stmt, [data], function (error, result) {
        // console.log("this is sql query :- ",query.sql,error)
        if(error){
            return reject(error);
        }
        return resolve (result);
    });
});
return DBHandler(apiReference, event, stmt, [insertObj] );
}