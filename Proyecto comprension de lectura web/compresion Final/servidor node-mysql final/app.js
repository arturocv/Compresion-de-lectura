import express, { json }  from "express";
import morgan from "morgan";

const cors = require("cors");
const app = express();


//Routes
import userRoutes from './routers/userRoutes';


// Settings
app.set("port", 4000);


// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());


//Routes
app.use(userRoutes);


export default app;
