import express, { json }  from "express";
import morgan from "morgan";

const app = express();



//Routes
import languageRoutes from './routers/languageRoutes';



// Settings
app.set("port", 4000);



// Middlewares
app.use(morgan("dev"));
app.use(express.json());


//Routes
app.use(languageRoutes);


export default app;
