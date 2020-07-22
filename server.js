require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('helpers/error-handler');

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
    vcapLocal = require("./vcap-local.json");
    console.log("Loaded local VCAP", vcapLocal);
} catch (e) {}

const appEnvOpts = vcapLocal ? { vcap: vcapLocal } : {};


var cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv(appEnvOpts);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
var port = process.env.PORT || 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
