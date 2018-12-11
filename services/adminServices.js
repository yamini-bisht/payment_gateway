const request = require('request');
const Promise = require('bluebird');
const Joi = require('joi');

const apiReferenceModule = 'admin';

exports.adminServicesSignUp              = adminServicesSignUp;
exports.adminServicesLogin               = adminServicesLogin;
exports.fetchAdminDataFromTable          = fetchAdminDataFromTable;
exports.updateAdminDataFromTable         = updateAdminDataFromTable;
exports.addItemServices                  = addItemServices;

function adminServicesSignUp(data) {
        let stmt = `INSERT INTO admin SET ?`;
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

function fetchAdminDataFromTable(email, password){
    let stmt = ` SELECT * FROM admin WHERE email = ? AND password = ? `;
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

function updateAdminDataFromTable(accessToken, email, password){
    let stmt = ` UPDATE admin SET access_token = ? WHERE email = ? AND password = ? `;
    return new Promise((resolve, reject) => {
        let query = connection.query( stmt, [accessToken, email, password], function (error, result) {
            if(error){
                return reject(error);
            }
            return resolve (result);
        });
    });
    return DBHandler(apiReference, event, stmt, [insertObj] );
}

function addItemServices(data) {
    let stmt = `INSERT INTO tb_items SET ?`;
    return new Promise((resolve, reject) => {
    let query = connection.query( stmt, [data], function (error, result) {
        if(error){
            return reject(error);
        }
        return resolve (result);
    });
});
return DBHandler(apiReference, event, stmt, [insertObj] );
}

function adminServicesLogin(req, res) {
    let apiReference = {
        module: apiReferenceModule,
        api: "adminServicesLogin"
    }
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

    Promise.coroutine(function* () {
        let fetch = yield commonFunction.fetchDataFromTable(apiReference, email, password);
        if(fetch){
            let accessToken = Math.random().toString(36).slice(2);
            let insertAccessToken = yield commonFunction.updateDataFromTable(apiReference, "access_token", accessToken, email, password);
            let data = {
                username    : fetch[0].username,
                email       : fetch[0].email
            }
            return {"status": 200, "message":"You are successfully logged in", "data" : data}
        }
    })().then(result => {
        return response.actionCompleteResponse(res, result);
    }).catch(error => {
        console.log("error", error);
        return response.sendActionFailedResponse(res, [], error.message, error.status_code);
    });
}
