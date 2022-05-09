'use strict';

const express = require('express');
const server = express();
server.use(express.json());
//---------------------------------------------------------------------
const cors = require('cors');
server.use(cors());
const port = 3000
//------------------------------------------------------------------------------
const url5 = "postgres://mohammad:12345@localhost:5432/me"
const { Client } = require('pg');
const client = new Client (url5)
const bodyParser = require('body-parser')
//---------------------------------------------------------------------------
const moviesDataJson = require('./Movie Data/data.json');
const axios = require("axios").default;
const APIKEY = process.env.API_KEY
require('dotenv').config();
//console.log(process.env) // remove this after you've confirmed it working

/*server.get("/firstTry", handleTry);
function handleTry (req, res) {
    res.send("Hello");
    console.log(res)
}*/

server.get("/", handleGet);
server.get("/fav", handleFavPage);
server.get('/tren', handleTrendingPage); 
server.get('/search',handleSearchPage);
server.get('/top_rated',handleTtop_ratedPage);
server.get('/now_playing',handleNow_playingPage);
server.post('/postMovie',handelpostMovie);
server.get('/getMovies',handelGetMovies);
//------------------------------Task------------------------------
server.put('/updateMovie/:id',handelUpdatePage);
server.delete('/deleteMovie/:id',handleDeletePage);
server.get('getMovie/:id',handleGetIdPage);
//----------------------------------------------
server.get("*", handleErrorNotFound);
server.get(handleServerError)
//-----------------------------------------------------------------------------------------------
function Movies (title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

function MoviesAPI (id,title,release_date, poster_path, overview) {      
    this.id=id ; 
    this.title = title;
    this.release_date=release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

//------------------------------------------------------------------------------------------------------
function handleGet(req, res) {
    let data = new Movies (moviesDataJson.title,  moviesDataJson.poster_path, moviesDataJson.overview);
    console.log(data)
    return res.status(200).json(data);
}

function handleFavPage(req, res) {
    return res.status(200).send("Welcome to Favorite Page");
}


function handleErrorNotFound (req,res){
    return res.status(404).send("Sorry! This page is not found");
}

//-----------------------------------------------------------------------------------------------

function handleTrendingPage(req , res) { 
    let dataAPI=[];
    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US`;  
        axios.get(url).then(result=>{
           console.log(result.data); 
            result.data.results.map(ele =>{
            dataAPI.push(new MoviesAPI (ele.id ,ele.title,ele.release_date, ele.poster_path, ele.overview ));
            });
            res.status(200).json(dataAPI);
        }).catch((errMsg)=>{
            console.log(errMsg); 
        });
    }

    function handleSearchPage (req , res){
        let searchAPI = []; 
        let MovieName = req.query.query;
        let url1 = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${MovieName}&page=1`;
        axios.get(url1).then(result=>{
            console.log(result.data);
            result.data.results.map(ele=>{
                searchAPI.push(new MoviesAPI (ele.id ,ele.title,ele.release_date, ele.poster_path, ele.overview));
            }); 
            res.status(200).json(searchAPI);
        }).catch((errMsg)=>{
            console.log(errMsg); 
        });
    
    }

    function handleTtop_ratedPage (req , res){ 
    let topAPI=[];
    let url2 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`;  
        axios.get(url2).then(result=>{
           console.log(result.data); 
            result.data.results.map(ele =>{
            topAPI.push(new MoviesAPI (ele.id ,ele.title,ele.release_date, ele.poster_path, ele.overview));
            });
            res.status(200).json(topAPI);
        }).catch((errMsg)=>{
            console.log(errMsg); 
        });
    }

    function handleNow_playingPage (req , res){ 
        let nowAPI=[];
        let url3 = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`;  
            axios.get(url3).then(result=>{
               console.log(result.data); 
                result.data.results.map(ele =>{
                    nowAPI.push(new MoviesAPI (ele.id ,ele.title,ele.release_date, ele.poster_path, ele.overview));
                });
                res.status(200).json(nowAPI);
            }).catch((errMsg)=>{
                console.log(errMsg); 
            });
        }

//...................................................................................................


        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());
         
       
        function handelpostMovie (req, res) {
            console.log(req.body);res.send("ok");
           let title = req.body.title  
           let release_date = req.body.release_date
           let poster_path = req.body.poster_path
           let overview = req.body.overview
            
            const sql = `INSERT INTO me (title, release_date, poster_path, overview) VALUES ($1, $2, $3, $4) RETURNING *;`;
            let values = [title,release_date, poster_path, overview];
            client.query(sql,values).then(result =>{
                console.log(result);
            }
                ).catch((errMsg)=>{
                    console.log(errMsg);
                    handleServerError (Error,req,res) 
                });
            }
            
            function handelGetMovies (req,res)
            {
                let sql='SELECT * FROM me;';
                client.query(sql).then(result=>{
                res.status(200).json(result.rows)
                }).catch((errMsg)=>{
                    console.log(errMsg);
                     
                });
            }
            
    
//-------------------------------------Task14-----------------------------------------------------------
function handelUpdatePage (req,res)           //update movie comments by id  
{
    
           let title = req.body.title  
           let release_date = req.body.release_date
           let poster_path = req.body.poster_path
           let overview = req.body.overview
           const id = req.params.id;
    const sql = `UPDATE me
    SET title=$1, release_date=$2, poster_path=$3, overview=$4 
    WHERE id=$5 RETURNING *;`;
                 let values = [title,release_date, poster_path, overview, id]; 
    client.query (sql,values).then(result=>{
        console.log(result);
        res.status(201).json(result.rows);
    }).catch((errMsg)=>{
        console.log(errMsg);
         
    });

}

function handleDeletePage(req,res)        //Delete movie by id  
{
    const id = req.params.id;
    const sql = `DELETE FROM me WHERE id=${id}`; 
    client.query(sql).then(()=>{
        res.status(200).json("Movie has been deleted");
    }).catch((errMsg)=>{
        console.log(errMsg);       
});
}

function handleGetIdPage (req,res)        //get movie by id 
{
    const id = req.params.id;
    const sql = `SELECT id FROM me WHERE id=${id};`; 
    let values = [title,release_date, poster_path, overview, id];
    client.query(sql,values).then(result=>{
        console.log(result);
        res.status(200).json(result.rows);
        }).catch((errMsg)=>{
            console.log(errMsg);
             
        });

}





function handleServerError (Error,req,res){                      
    const error = {
        status : 500,
        message : Error
    };
   
}

//----------------------------------------------------------------------------------------------
 client.connect().then(()=> {
     server.listen(port, ()=>
     {console.log(`server is running on ${port}`)})
        })







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