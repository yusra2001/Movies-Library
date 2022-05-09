'use strict';

// npm init -y 
// npm i express
// npm i cors 
// npm i express cors

const data = require('./data.json');

// use the packages ?
const express = require('express');
const cors = require('cors');

// creating a server 
const server = express();
server.use(cors());
server.get('/', handelMovie )
server.get('/favorite', handelGet ) //localhost:3000


function Movie(title,poster_path,overview){
    this.title= title;
    this.poster_path =poster_path;
    this.overview=overview;
 }

 
function handelGet(request,response){
   return response.status(200).send("Welcome to Favorite Page")
}



server.listen(3000,()=>{
    console.log("my server is listining to port 3000");
})
function handelMovie(req,res){
    let movies = [];
    data.data.forEach(val=>{
        let obj = new Movie(val.title, val.poster_path, val.overview);
        movies.push(obj);
    })
    return res.status(200).json(movies);
}









// 'use strict';



// const express = require("express");
// const app =express();
// const port =3000;


// //app.METHOD(PATH, HANDLER);
// app.get("/firstrout", handlefirstrout);
// app.get("/", homehandeler);

// function handlefirstrout(req, res){
//     res.send("hello");
// }

// function homehandeler(req, res){
//     res.send("hello it's the Home Page") 
// }
// //http://localhost:3000/firstrout

// /////////////////////
// // app.get("/",(req, res)=> {
// //     res.send("hellow world");
// // });

// app.listen(port, () => {
//     console.log(`example app listening on port ${port}`);
// });