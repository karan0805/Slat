require('dotenv').config();

const app = require('express')();
require('./app-config')(app);
const http = require('http').Server(app);

const PORT = process.env.PORT || 5000;

http.listen(PORT, function () {
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
