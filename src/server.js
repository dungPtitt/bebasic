import configViewEngine from "./configs/viewEngines";
import express from "express";
require('dotenv').config()
const app = express()
configViewEngine(app)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})