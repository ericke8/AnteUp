const express = require('express');
var path = require('path');
const app = express();
const port = 3000;
app.use(express.static(__dirname + '/src/'));

var contests = {
    'TV Shows': [
        {event: "Game of Thrones", question: "Question", expiration: "Mar 31, 2019 15:37:25", yes: "10", no: "4"}, 
        {event: "Pokemon", question: "Question", expiration: "Mar 30, 2019 15:37:25", yes: "14", no: "2"}
    ],
    College: [],
    Pro: []
}

function handleRoot(req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
}

function handleBet(req, res) {
    res.sendFile(path.join(__dirname + '/src/bet.html'));
}

function handleList(req, res) {
    res.sendFile(path.join(__dirname + '/src/list.html'));
}

function handleGetList(req, res) {
    console.log(req.query.category);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(contests[req.query.category]);
}

function handleGetBet(req, res) {
    let list = contests[req.query.category];
    console.log(list);
    console.log(req.query);
    let returnObj = {event: null};
    for (let i = 0; i < list.length; i++) {
        if (list[i].event == req.query.event && list[i].question == req.query.question) {
            returnObj = list[i];
            break;
        }
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(returnObj);
}

app.get('/', handleRoot);
app.get('/bet', handleBet);
app.get('/list', handleList);
app.get('/get-list', handleGetList);
app.get('/get-bet', handleGetBet);
app.listen(port, () => console.log(`Example app listening on port ${port}...`));