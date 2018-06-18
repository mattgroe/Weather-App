var express = require('express');
var router = express.Router();
const path = require('path');


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
router.post('/', function (req, res) {
    res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;