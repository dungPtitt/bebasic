import express from "express";
import homeController from "../controller/homeController";
import accountController from "../controller/accountController";
let router = express.Router()

const initWebRoute = (app)=> {
  router.get("/", homeController.getAdminPage);
  router.post("/login", homeController.handleLogin);
  router.get("/admin-page", homeController.getAdminPage);
  router.get("/manager-page", homeController.getManagerPage);
  router.get("/member-page", homeController.getMemberPage);

  router.post("/create-acc", accountController.createAccWeb);
  router.get("/edit-add-acc", accountController.getEditAcc);
  router.post("/update-acc", accountController.getUpdateAcc);
  router.get("/delete-acc", accountController.deleteAccWeb);
  router.get("/get-all-acc", homeController.getAllAcc);
  router.post("/create-slide", homeController.createSlide);
  router.get("/test", homeController.testApi);
  return app.use("/", router);
}

export default initWebRoute;