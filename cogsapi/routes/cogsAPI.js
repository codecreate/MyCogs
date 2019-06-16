const express = require("express");
var app = express();
const router = express.Router();
const Discogs = require('disconnect').Client;

router.use(function(req, res, next) {
    next();
});

router.get("/", function (req, res, next) {
    res.send('Nothing to see here!');
});

router.get("/authorise", function (req, res, next) {
    console.log('cogsAPI authorise');
    let oAuth = new Discogs().oauth();
    oAuth.getRequestToken(
        process.env.CONSUMER_KEY,
        process.env.CONSUMER_SECRET,
        'http://localhost:3000/callback',
        // 'http://localhost:9000/cogsAPI/callback',
        function (err, requestData) {
            if (requestData){
                console.log('authorise requestData ',requestData);
                // Persist "requestData" here so that the callback handler can
                // access it later after returning from the authorize url
                // this.requestData = requestData;
                app.locals.requestData = requestData;
                res.send(requestData.authorizeUrl);
                // res.redirect(requestData.authorizeUrl);
            }else if (err){
                console.log('Authorise error ',err);
            }
        }
    );
});

router.get('/callback', function (req, res) {
    console.log('cogsAPI callback using ',app.locals.requestData);
    let oAuth = new Discogs(app.locals.requestData).oauth();
    console.log("req.query.oauth_verifier prev",req.query.oauth_verifier);
    oAuth.getAccessToken(
        req.query.oauth_verifier, // Verification code sent back by Discogs
        function (err, accessData) {
            if (accessData) {
                // Persist "accessData" here for following OAuth calls
                console.log('Callback accessData ',accessData);
                app.locals.accessData = accessData;
                res.send(accessData);
            }else if (err){
                console.log('Callback error '+err);
            }
        }
    );
});

router.get("/identity", function (req, res) {
    console.log('cogsAPI identity accessData', app.locals.accessData);
    let dis = new Discogs(app.locals.accessData);
    dis.getIdentity(function (err, data) {
        if (data){
            console.log('Identity data ',data);
            res.send(data);
        }else if (err){
            console.log('Identity error ',err);
        }

    });
});

router.get("/collection", function (req, res) {
    console.log('cogsAPI collection', req.query.username, req.query.folder, req.query.page, req.query.per_page);
    let col = new Discogs(app.locals.accessData).user().collection();
    col.getReleases(req.query.username, req.query.folder, {page: req.query.page, per_page: req.query.per_page}, function(err, data){
        if (data){
            res.send(data);
        }else if (err){
            console.log('Collection error ', err);
        }

    });
});

router.get("/release", function (req, res) {
    console.log('cogsAPI release', req);
    let release = new Discogs(app.locals.accessData).database();
    release.getRelease(req.query.release_id, function(err, data){
        if (data){
            console.log('Release data ', data);
            res.send(data);
        }else if (err){
            console.log('Release error ', err);
        }
    })
});

module.exports = router;