const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.get('/authenticate', authenticate);
router.get('/printheader', printHeader);

module.exports = router;

function authenticate(req, res, next) {

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    req.username=username;
    req.password=password;

    userService.authenticate(req.username, req.password)
        .then(user => {
            if (user) {
                delete user.password;
                req.user = user;
                res.setHeader('x-selected-scope', user.scope);
                res.setHeader('X-API-OAUTH-METADATA-FOR-PAYLOAD',JSON.stringify(user));
                res.setHeader('X-API-OAUTH-METADATA-FOR-ACCESSTOKEN',JSON.stringify(user));
                console.log("Request Headers:\n");
                console.log(req.headers);
                console.log("Request User:\n");
                console.log(req.user);
                res.json(user);
            } else {
                res.status(401).json({ message: 'Username or password is incorrect' })
            }
        })
        .catch(err => next(err));
}


function printHeader(req, res, next) {
    console.log("Request Headers:\n");
    console.log(req.headers);
    res.json({success:true});

}


