const express = require('express');
var path = require('path');
const app = express();
const port = 3000;
app.use(express.static(__dirname + '/src/'));

function handleRoot(req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
}

function handleBet(req, res) {
    res.sendFile(path.join(__dirname + '/src/bet.html'));
}

app.get('/', handleRoot);
app.get('/bet', handleBet);
app.listen(port, () => console.log(`Example app listening on port ${port}...`));