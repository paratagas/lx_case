module.exports = {
    appRort: "3000",
   	mongo: {
        development: {
            connectionString: 'mongodb://localhost/lx_case'
        }
    },
    imagesDestinationDir: __dirname + '/public/images/',
    randomImageUrl: 'http://www.splashbase.co/api/v1/images/',
    lastExistingImageNum: 8000,
    saltForHashes: 'someRandomString',
    sessionSecret: "someSecretString"
};
