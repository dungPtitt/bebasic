import express from "express";
// import homeController from "../controller/homeController";
import managerController from "../controller/managerController";
let router = express.Router()
     
let checkLogin = (req, res, next)=>{
  if(req.cookies.token){
    next();
    return;
  }
  return res.redirect("/login");
}

const initManagerRoute = (app)=> {
  router.get("/", managerController.getManagerPage);
  router.get("/account", managerController.getViewAccount);
  router.get("/product", managerController.getViewProduct);

  return app.use("/manager/", checkLogin, router);
}

export default initManagerRoute;