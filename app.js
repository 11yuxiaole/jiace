const express=require("express");
const users=require("./routes/users")
const session = require('express-session');
const bodyParser = require('body-parser');
var app=express();
var sever=app.listen(3001);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));
app.use(session({
    secret: '128位随机字符串',
    resave: false,
    saveUninitialized: true,
  }))
app.use("/users",users);