const mongoose = require('mongoose')
require('dotenv').config();
const URL = process.env.URL;

mongoose.connect(URL);


const db = mongoose.connection;

db.on('connected', ()=>{console.log("Database connected successfully")})

db.on('disconnect', ()=>{console.log("Datbase is disconnected")})

db.on('error', ()=>{console.log("error in connecting database")})

module.exports = db;
