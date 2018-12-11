const express         = require('express');
const bodyParser      = require('body-parser');
const mysql           = require('mysql');
const routes        = require('./routes/index');

const app       = express();
config          = require('config');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const port = process.env.PORT || config.get('PORT')

app.use('/routes', routes);

connection = mysql.createConnection(config.get('database_settings'));
    
    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
        }else{
            console.log('database connected at...', config.get('database_settings.mysqlPORT'));
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.

const server = app.listen(port, function () {
    console.log(`Server running at ${port} `);
});