var fs = require('fs');
var express = require('express');
var jsonwebtoken = require('jsonwebtoken');
var app = express();
var multer = require('multer');
var uuid = require('node-uuid');
var mime = require('mime');

const handler  = {
    get (target, key) {

        console.log(`Accessing config key: ${key}`);

        if(process.env[key.toUpperCase()]) {
          console.log(`Loading config key '${key.toUpperCase()}' from process.env`);
          return process.env[key.toUpperCase()];
        } else if(target[key]) {
          console.log(`Loading config key '${key}' from config.json`);
          return target[key];
        } else {
            throw Error(`Neither process.env nor config.json contain key ${key}`);
        }
    }
};

const target = require('./config.json');

const config = new Proxy(target, handler);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.uploadfolder)
    },
    filename: function (req, file, cb) {
        cb(null, `${uuid.v4()}.${mime.extension(file.mimetype)}`);
    }
});

var upload = multer({storage: storage});

app.get('/', function (req, res) {
    res.status(200);
    res.end('Breakout Media Uploader');
});

app.post('/', upload.single('file'), auth, function (req, res) {
    var tofile = `${config.movefoler}${req.body.id}###${req.file.originalname}`;
    fs.rename(req.file.path, tofile, function (err) {
        if (err) {
            console.error(err);
            res.status(500);
            res.end("error");
        } else {
            res.status(201);
            res.end('done');
        }
    });
});


function auth(req, res, next) {
    if (req.get('X-UPLOAD-TOKEN') && req.body.id && !isNaN(parseInt(req.body.id))) {
        var token = req.get('X-UPLOAD-TOKEN');
        var id = parseInt(req.body.id);
        var decoded = parseInt(jsonwebtoken.decode(token, config.jwt_secret, 'HS512').subject);
        if (decoded === id) {
            console.log(`auth succeeded for id: ${id}`);
            next();
        } else {
            res.status(401);
            res.json({error: "authentication failed"});
        }
    } else {
        res.status(401);
        res.json({error: "authentication token missing"});
    }

}

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Media-uploader listening at http://%s:%s', host, port);
});