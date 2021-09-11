// Seting up empty JS object to act as endpoint for all routes
let projectData = {};
// Express to run server and routes
const express = require('express');
// Starting up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 8080;
app.listen(port,()=>{
    // Callback to debug  
    console.log(`We\'re golden\nserver running in localhost:${port}`);
});
// Get Route
app.get('/getData',sendData);
function sendData(req,res){
    console.log(projectData);
    res.send(projectData);
}
// Post Route
app.post('/postData',post);
function post(req,res){
    projectData = req.body.main;
    res.send(projectData);
}