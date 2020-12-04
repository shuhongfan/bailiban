var express = require('express');
var app = express();

var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extented:false}))
app.use(bodyParser.json())

//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "token,content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/x-www-form-urlencoded");
    next();
});

const user=require('./api/user');
app.use(user)

app.listen(3000);
