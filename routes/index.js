const express           =   require('express');
const app               =   express();
const admin             =   require('./admin');
const customer          =   require('./customer');
const booking           =   require('./booking');

module.exports = app;

app.post('/admin_sign_up', admin.adminSignUp);
app.post('/admin_login', admin.adminLogin);
app.post('/add_item', admin.addItem);

app.post('/customer_sign_up', customer.customerSignUp);
app.post('/customer_login', customer.customerLogin);
app.post('/add_card', customer.addCard);
app.get('/show_item', customer.showItem);

app.post('/create_booking', booking.createBooking);
app.get('/show_booking', booking.showBookings);