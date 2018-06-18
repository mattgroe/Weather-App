var express = require('express');
var app = express();


var router = require('./public/routes.js');

app.use(express.static(__dirname + '/public'));

app.use('/', router);

app.listen(3000, () => {
    console.log('Weather app listening on port 3000!');
});