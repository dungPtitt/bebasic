import express from "express";
import homeController from "../controller/homeController";
import loginController from "../controller/loginController";
let router = express.Router()

const initWebRoute = (app)=> {
  router.get("/", homeController.getHomePage);
  router.get("/login", homeController.getHomePage);
  router.post('/login', loginController.login);
  router.get('/verify', loginController.verify);
  router.post("/create-slide", homeController.createSlide);

  return app.use("/", router);
}

export default initWebRoute;