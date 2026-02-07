// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./model/userSchema');
const cors = require('cors'); // Import CORS
const path = require('path');
const advertisementRoutes = require('./router/auth');
require('./db/conn');

dotenv.config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT;

// app.use(cors({
//     origin: 'http://localhost:4000', // Adjust if needed
// }));

const allowedOrigins = ['https://legalyes.netlify.app', 'https://easylegal.co.in', 'http://localhost:3000', 'https://admin-easy.netlify.app', 'https://admin.easylegal.co.in', 'http://localhost:4000'];

app.use(cors({
  origin: function(origin, callback){
    // Check if the origin is in the list of allowed origins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Specify methods if needed
  allowedHeaders: ['Content-Type'] // Specify headers if needed
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(require('./router/auth'));
app.use('/api/ads', advertisementRoutes);

app.get('/db', (req, res) => {
    res.send('connected');
});

//Middleware
const middleware = (req, res, next) => {
    console.log('Hello middleware');
    next();
}


app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/contact', (req, res) => {
    res.send('Hello contact page');
});

app.get('/about', middleware, (req, res) => {
    res.send('Hello about page');
});

app.get('/login', (req, res) => {
    res.send('Hello login page ');
});

app.listen(PORT, () => {
    console.log(`listen on PORT ${PORT}`);
});


