'use strict';
var compression = require('compression');   
var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();
var notifier = require('node-notifier')
const logger = require('./lib/logger')(__filename);
require('dotenv').config({ path: path.join(__dirname, '.env') });

var http = require('http').Server(app);


app.use(express.static(__dirname));
app.use(compression({"threshold":0,"level":1}))
app.set('view engine', 'html');

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorHandler({ log: errorNotification }))
}
function errorNotification (err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url

    notifier.notify({
        title: title,
        message: str
    })
}


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());


/*CORS middleware */
app.use(function(req, res, next) {
    var url=req.originalUrl;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    logger.info("----------------------------------------------")

    var start = Date.now();
    res.on('finish', function() {
        var duration = Date.now() - start;
    	logger.info("\npath :"+url+" duration: "+duration);
        logger.info("----------------------------------------------")
    })
    
    next();
    if(req.method=='POST'){
        logger.info(url +" :: "+JSON.stringify(req.body,null,4))
    }else if(req.method=='GET'){
        logger.info(url +" :: "+JSON.stringify(req.params,null,4))
    }
});

app.use(nocache);
app.use(function errorHandler(err, req, res, next){
    res.json({err:"api_error"})
});

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}
var usersRouter = require('./routes/userRouter');

//Define routers
app.use('/user/', usersRouter);

//Create Server : Listen to port
http.listen(process.env.SERVER_PORT,'0.0.0.0',function() {
    logger.info(process.env.APP_NAME+' Server running on : '+process.env.SERVER_PORT);
});
