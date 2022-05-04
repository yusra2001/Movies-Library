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

require('dotenv').config();

const data = require('./data.json');

const cors = require('cors');
const axios = require('axios');
const server = express();
const port= process.env.PORT

server.use(cors());
server.use (express.json);

server.get('/', handelMovie)
server.get('/favorite', handelGet) //Welcome to Favorite Page
server.get('/trending',handelTrending)
server.get('/search',handelSearching)
server.get('/rout1',handelRout1)
server.get('/rout2',handelRout2)
server.use('', handleError) // 404 Error
server.use (handleError500)

let url=`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}`

function Movie(id,title,release_date, poster_path, overview) {
    this.id=id;
    this.title = title;
    this.release_date=release_date;
    this.poster_path = poster_path;
    this.overview = overview;
   
    
}


/ **   handelMovie ** /
function handelMovie(req, res) {

    let obj = new Movie(data.title, data.poster_path, data.overview);
    return res.status(200).json(obj);
}


//**    handelGet        ** /
function handelGet(request, response) {
    return response.status(200).send("Welcome to Favorite Page")
}

function handelTrending(request, response) {
   axios.get(url).then((access)=>{let movieData=access.data.results
let movieC=movieData.map((access2)=>{return new Movie(access2.id,access2.title,access2.release_date,access2.poster_path,access2.overview);
     })
response.status(200).json(movieC)
   }).catch((err) => {
    console.log("Error");
   })
}

let movie = "Riverdance: The Animated Adventure";

function handelSearching(request, response) {
    let url2=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&query=${movie} `;
    axios.get(url2).then((access)=>{let movieData=access.data.results
 let movieC=movieData.map((access2)=>{return new Movie(access2.id,access2.title,access2.release_date,access2.poster_path,access2.overview);
      })
 response.status(200).json(movieC)
    }).catch((err) => {
     console.log("Error");
    })
 }
 function handelSearching(request, response) {
 let url3 = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.APIKEY}`;
 axios.get(url3)
 .then((access3) => {
     let result = access3.data;
     res.status(200).json(result);
     console.log(result);
 }).catch((err) => {
     console.log("Error");
 })}
 




/**        handleError404          **/
function handleError(request, response) {
    response.status(404).send('page not found error 404')
}


/**       handleError500          **/
function handleError500(error,request, response) {
    const err = {
        "status": 500,
        "responseText": "Sorry, something went wrong"
    }
    response.status(500).send(err);

}


server.listen(3000, () => {
    console.log("my server is listining to port 3000");
})

const cors= require('cors')
const jsonData = require("./MovieData/data.json");



    
    
    var error_404 = {
        "status": 404,
        "responseText": "This page endpoint not found "
        }

// www.localhost:3000/hello 

app.get ('/' , homepage )
app.get ('/favorite', favorite)
app.get('*', error404 )


function homepage(req,res){
    res.status(200).json({
        "title": "Spider-Man: No Way Home",
        "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
        })
    }
    
    function Ensure(title,poster_path,overview)
    {
        this.title = title;
        this.poster_path = poster_path;
        this.overview = overview;
    }



    function favorite(req,res){
        res.status(200).send("Welcome to Favorite Page");
    }
    

function error404 (req,res){
res.status(404).send(error_404)
}




app.listen (3000, () => {
    console.log("I can hear you");

} )
