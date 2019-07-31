const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
// const rjwt = require('restify-jwt-community');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

// Protect Routes
// colocando o protetor de rotas aqui ele ira protejer todas as rotas da aplicação
// explo de protejendo rotas especificas em routes/customers.js
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth']}));

server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });
})

const db = mongoose.connection;
db.on('err', err => console.log(err));

db.once('open', () => {
  require('./routes/customers')(server);
  require('./routes/users')(server);
  console.log(`Server started on ${config.PORT}`);
})
