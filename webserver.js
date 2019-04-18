const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/', function (_, response) {
    response.sendFile(__dirname + '/index.html');
});

app.listen(8000);