const Customer = require('../models/Customers');
const config = require('../config');
const rjwt = require('restify-jwt-community');

module.exports = server => {
  // Get Customer
  server.get('/customer', async (req, res, next) => {
    try {
      const customers = await Customer.find();
      res.send(customers); 
      next();
    } catch (error) {
      return next(new Error(error.message));
    }
  });

  // Select One Customer
  server.get('/customer/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findById(id);
      res.send(customer);
      next()
    } catch (error) {
      return next(new Error(error.message));
    }
  });

  // Add Customer
  server.post('/customer', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    const { name, email, balance } = req.body;
    const customer = new Customer({
      name,
      email,
      balance,
    });

    try {
      const newCustomer = await customer.save();
      res.send(201);
      next()
    } catch (error) {
      return next(new Error(error.message));
    }
  });

  // Update Customer
  server.put('/customer/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    try {
      const { id } = req.params;
      await Customer.findByIdAndUpdate(id, req.body);
      res.send(201);
    } catch (error) {
      return next(new Error(error.message));
    }
  });

  // Delete Customer
  server.del('/customer/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    try {
      const { id } = req.params;
      await Customer.findByIdAndRemove(id);
      res.send(201);
      next();
    } catch (error) {
      return next(new Error(error.message));
    }
  })

}