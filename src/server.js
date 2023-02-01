import configViewEngine from "./configs/viewEngines";
import express from "express";
import initWebRoute from './router/web';
require('dotenv').config()
const app = express()

//set ejs engine
configViewEngine(app)
//init web route
initWebRoute(app)

const port = process.env.PORT || 3000

// app.get('/', (req, res) => {
//   res.render("index.ejs")
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})