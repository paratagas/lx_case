var fs = require('fs');
var request = require('request');
var User = require('../models/user');
var appSettings = require('../settings');
var imagesDestinationPath = appSettings.imagesDestinationDir;
var restler = require('restler');
var baseRandomImageUrl = appSettings.randomImageUrl;
var lastExistingImageNum = appSettings.lastExistingImageNum;
var salt = appSettings.saltForHashes;
var crypto = require('crypto');

function getRandomNumForUrl(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createImageUrl(baseUrl, randomEndNum) {
    // Get the last Url param to get image
    // 8000 is the current last successfully tested existing image
    var randomNumForUrl = 0;
    randomNumForUrl = getRandomNumForUrl(1, randomEndNum);
    var wholeRandomImageUrl = baseUrl + randomNumForUrl;
    //console.log("wholeRandomImageUrl: ", wholeRandomImageUrl);
    return wholeRandomImageUrl;
}

exports.handleForm = function(req, res){
    console.log(req.body);
    var userEmail = req.body.user_email;
    var userPassword = req.body.user_password;
    var userPasswordSalted = userPassword + salt;
    var userPasswordHashed = crypto.createHash('sha256').update(userPasswordSalted).digest("hex");
    //console.log("userPassword: ", userPassword);
    //console.log("userPasswordSalted: ", userPasswordSalted);
    //console.log("userPasswordHashed: ", userPasswordHashed);

    User.findOne({ 'email': userEmail }, function (err, user) {
        if (err) return handleError(err);
        console.log("user: ", user);

        if (user) {
            if (userPasswordHashed === user.password) {
                // authorized
                console.log("Password from form: " + userPasswordHashed + " matches to password from DB: " + user.password);
                req.session.userEmail = user.email;
                req.session.userPhoto = user.photo;
                res.redirect('/account');
            } else {
                // not authorized
                console.log("Password from form: " + userPasswordHashed + " NOT matches to password from DB: " + user.password);
                res.redirect('/');
            }

        } else {
            var imageFileUrl = "";
            var wholeCreatedRandomImageUrl = createImageUrl(baseRandomImageUrl, lastExistingImageNum);
            //console.log("wholeCreatedRandomImageUrl: ", wholeCreatedRandomImageUrl);
            var fileNameForSave = userEmail + ".jpg";

            restler.get(wholeCreatedRandomImageUrl)
                .on('success', function(data) {
                    console.log("data.url:", data.url);
                    imageFileUrl = data.url;
                    download(imageFileUrl, fileNameForSave, function(){
                        console.log('Image file vas saved: ', fileNameForSave);
                        new User({
                            email: userEmail,
                            password: userPasswordHashed,
                            photo: fileNameForSave
                        }).save();

                        req.session.userEmail = userEmail;
                        req.session.userPhoto = fileNameForSave;

                        res.redirect('/account');
                    });
                })
                .on('error', function() {
                    console.log("Error");
                });

            var download = function(uri, filename, callback){
                request.head(uri, function(err, res, body){
                    request(uri).pipe(fs.createWriteStream(imagesDestinationPath + filename)).on('close', callback);
                });
            };
        }
    });
};

exports.logOut = function(req, res){
    if (res.locals.userEmail) {
        console.log("res.locals.userEmail was: ", res.locals.userEmail);
        delete res.locals.userEmail;
    }

    if (res.locals.userPhoto) {
        console.log("res.locals.userPhoto was: ", res.locals.userPhoto);
        delete res.locals.userPhoto;
    }

    res.redirect('/');
};
