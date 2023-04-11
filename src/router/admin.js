import express from "express";
import adminController from "../controller/adminController";

let router = express.Router()
     
let checkLogin = (req, res, next)=>{
  //check login
  console.log("check!!", req.body);
  next();
}

const initAdminRoute = (app)=> {
  router.get("/", adminController.getAdminPage);
  return app.use("/admin/", checkLogin, router);
}

export default initAdminRoute;