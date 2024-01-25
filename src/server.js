import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import connection from "./config/connectDB"
import configCors from "./config/cors"
import cookieParser from 'cookie-parser'
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

//config cors
configCors(app);
//config view Engine
configViewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
connection();

//config cookie-parser
app.use(cookieParser());
//init Web Router
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log(">>>JWT Backend is running on the port" + PORT)
})