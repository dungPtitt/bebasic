import configViewEngine from "./configs/viewEngines";
import express from "express";
import cors from "cors";
import initWebRoute from './router/web';
import initAPIRoute from './router/api';
import checkConnectDB from "./configs/connectDB";
import initAdminRoute from "./router/admin";
import bodyParser from "body-parser";
// import multer from 'multer';

require('dotenv').config()
const app = express()


app.use(cors({
  origin: true
}));
// Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({extended: true}));
// Parse JSON bodies (as sent by API clients)
// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

//set ejs engine
configViewEngine(app);
//init web route
initWebRoute(app);
//init api route
initAPIRoute(app);
initAdminRoute(app);

checkConnectDB();


const port = process.env.PORT || 8080

// app.get('/', (req, res) => {
//   res.render("index.ejs")
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})