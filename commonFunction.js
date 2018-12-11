const Promise     = require('bluebird');
const config          = require('config');
const stripe = require("stripe")(config.get('stripe_secret_key'));
const stripePublicKey = require("stripe")(config.get('stripe_publishable_key'));

exports.createToken         = createToken;
exports.createCustomer      = createCustomer;
exports.createCharges       = createCharges;

function createToken(data, res) {
    return new Promise((resolve, reject) => {
        stripe.tokens.create({
            card:{  
               "number": data.card_number,
               "exp_month": data.expiry_month,
               "exp_year": data.expiry_year,
               "cvc": data.cvc
       }
       },function(error,result){
        if(error) {
            return reject(error);
        }
        return resolve(result);
       });
    });
}
function createCustomer(data, res) {
    return new Promise((resolve, reject) => {
        stripe.customers.create({
            description :"creating customer",
            source : data.token
        },function(error,result){
        if(error) {
            return reject(error);
        }
        return resolve(result);
       });
    });
}

function createCharges(data, res) {
    return new Promise((resolve, reject) => {
        stripe.charges.create({
            amount : data.price,
            currency : "usd",
            source : data.id,
            description :"charge new customer"
        },function(error,result){
        if(error) {
            return reject(error);
        }
        return resolve(result);
       });
    });
}