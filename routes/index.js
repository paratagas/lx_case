var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'LX Case' });
});

/* GET page for logged in users. */
router.get('/account', function(req, res, next) {
    if (res.locals.userEmail) {
        console.log("res.locals.userEmail in /account: ", res.locals.userEmail);
        res.render('account', { title: 'LX Case' });
    } else {
        //res.render('login', { title: 'LX Case' });
        res.redirect('/');
    }
});

/* Logout functionality. */
router.get('/logout', mainController.logOut);

/* POST form handler. */
router.post('/handle_form', mainController.handleForm);

module.exports = router;
