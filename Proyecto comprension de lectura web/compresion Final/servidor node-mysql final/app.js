// import express, { json }  from "express";
// import morgan from "morgan";

const express = require('express');
const morgan = require('morgan');

const app = express();
const cors = require("cors");


//Routes
// import userRoutes from './routers/userRoutes';
const userRoutes = require('./routers/userRoutes');


// Settings
app.set("port", 4000);


// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());


//Routes
app.use(userRoutes);

export default app;
