'use strict';
const express = require("express");
const app = express();
constport =3000;
app.get("/",(req,res)=>{
    res.send("hello world?");
});
app.listen(port,() => {
    console.log(`example app listening on port ${port}`);

});