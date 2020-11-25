/**
 * Copyright [2020] [Kaleb Moreno]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

 * 
 * @author Kaleb Moreno
 * @version 11/10/2020
 * @description - This file holds all of the backend code for a simple API that sends JSON data 
 * to any site that sends in a GET request. The purpose is to have it 
 */


// The Express framework and other constants
const express = require('express'), 
    
    // Instance of the Express Framework
    app = express(), 

    // Path dependency 
    path = require('path'),

   // Heroku port or defaults to 3000
    appPort = process.env.PORT || 3000, 

    // Cors library
    cors = require('cors'),

    // For the eventual use of other APIs to complete the project
    axios = require('axios');


// telling the application to use CORS
app.use(cors());

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Telling express to expect JSON data
app.use(express.json());


// The jackpots object that is populated with data from the POST route
let jackpots = { 

    slot_jackpots: [ ], // Empty by default

    bingo_jackpots: [ ] // Empty by default
}

// Root route 
app.get('/', (req, res) => {
   
    // Testing for object emptiness and sending an explanation or the data if the objects are not empty
    if (jackpots.slot_jackpots.length < 1 || jackpots.bingo_jackpots.length < 1) {

        // Sending a message back to the user 
        res.send('<h1>There is not enough jackpot data at this time, try again later.</h1>' );

    } else {

        // Jackpot data
        res.json(jackpots);
    }
});

// The post route to update the jackpot objects     
app.post('/bingo', (req, res) => {

    // overwriting the bingo jackpots object with the data passed to this route
    jackpots.bingo_jackpots = req.body;

    // Sending back a successful message
    res.send(`\
    <h1> Bingo jackpots successfully updated!</h1>\
    `);
})

// The post route to update the jackpot objects     
app.post('/slots', (req, res) => {

    // overwriting the slot jackpots object with the data passed to this route
    jackpots.slot_jackpots = req.body

    // Sending back a successful message
    res.send("<h1>Slot jackpots successfully updated!</h1>");
})


// Telling the app to listen on either a local port in Heroku, or 3000 by default
app.listen(appPort, () => {
    console.log("Application started & listening on port: ", appPort);
});