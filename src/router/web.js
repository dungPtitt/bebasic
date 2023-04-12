import express from "express";
import homeController from "../controller/homeController";
import accountController from "../controller/accountController";
import productController from "../controller/productController";
let router = express.Router()

const initWebRoute = (app)=> {
  router.get("/", homeController.getHomePage);
  router.post("/login", homeController.handleLogin);
  router.get("/admin-page", homeController.getAdminPage);
  router.get("/account", homeController.getManageAccount);
  router.get("/product", homeController.getManageProduct);
  router.get("/manager-page", homeController.getManagerPage);
  router.get("/member-page", homeController.getMemberPage);

  //giao dien CRUD account phia server
  router.post("/create-acc", accountController.createAccWeb);
  router.get("/edit-add-acc", accountController.getEditAcc);
  router.post("/update-acc", accountController.getUpdateAcc);
  router.get("/delete-acc", accountController.deleteAccWeb);
  router.get("/get-all-acc", homeController.getAllAcc);

  //
  router.post("/create-slide", homeController.createSlide);
  router.get("/test", homeController.testApi);

  // giao dien CRUD phia server
  router.post("/create-product", productController.createProductWeb);
  router.get("/edit-add-product", productController.getEditAddProduct);
  router.post("/update-product", productController.updateProductWeb);
  router.get("/delete-product", productController.deleteProductWeb);
  return app.use("/", router);
}

export default initWebRoute;