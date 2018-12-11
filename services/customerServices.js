const request = require('request');
const Promise = require('bluebird');
const Joi = require('joi');

const moment = require('moment');

const apiReferenceModule = 'Customer';

exports.customerSignUp              = customerSignUp;
exports.fetchCustomerDataFromTable  = fetchCustomerDataFromTable;
exports.updateCustomerDataFromTable = updateCustomerDataFromTable;
exports.addCardServices             = addCardServices;
exports.showItemServices            = showItemServices;
// exports.customerLogin               = customerLogin;

function customerSignUp(data) {
    let stmt = `INSERT INTO customers SET ?`;
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

function fetchCustomerDataFromTable(email, password){
    let stmt = ` SELECT * FROM customers WHERE email = ? AND password = ? `;
    return new Promise((resolve, reject) => {
        let query = connection.query( stmt, [email, password], function (error, result) {
            // console.log("this is sql query :- ",query.sql,error)
            if(error){
                return reject(error);
            }
            return resolve (result);
        });
    });
    return DBHandler(apiReference, event, stmt, [insertObj] );
}

function updateCustomerDataFromTable(accessToken, email, password){
    let stmt = ` UPDATE customers SET access_token = ? WHERE email = ? AND password = ? `;
    return new Promise((resolve, reject) => {
        let query = connection.query( stmt, [accessToken, email, password], function (error, result) {
            console.log("this is sql query :- ",query.sql,error)
            if(error){
                return reject(error);
            }
            return resolve (result);
        });
    });
    return DBHandler(apiReference, event, stmt, [insertObj] );
}

function addCardServices(data) {
    let stmt = `INSERT INTO tb_card_details SET ?`;
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

function showItemServices(email, password){
    let stmt = ` SELECT * FROM tb_items `;
    return new Promise((resolve, reject) => {
        let query = connection.query( stmt, [email, password], function (error, result) {
            // console.log("this is sql query :- ",query.sql,error)
            if(error){
                return reject(error);
            }
            return resolve (result);
        });
    });
    return DBHandler(apiReference, event, stmt, [insertObj] );
}
