import express from "express";
import homeController from "../controller/homeController";

let router = express.Router()
     
let checkLogin = (req, res, next)=>{
  if(req.cookies.token){
    next();
    return;
  }
  return res.redirect("/login");
}

const initMemberRoute = (app)=> {
  router.get("/", homeController.getMemberPage);
  router.get("/account", homeController.getViewAccount);
  router.get("/product", homeController.getViewProduct);

  return app.use("/member/", checkLogin, router);
}

export default initMemberRoute;