import express from "express";
import accountController from "../controller/accountController";
import productController from "../controller/productController";
import billController from "../controller/billController";
import apiController from "../controller/apiController";

let router = express.Router()
     
const initAPIRoute = (app)=> {
  router.get("/get-acc", accountController.getAcc);
  router.post("/create-acc", accountController.createAcc);
  router.put("/update-acc", accountController.updateAcc);
  router.delete("/delete-acc", accountController.deleteAcc);

  router.get("/get-product", productController.getProduct);
  router.post("/create-product", productController.createProduct);
  router.put("/update-product", productController.updateProduct);
  router.delete("/delete-product", productController.deleteProduct);

  router.post("/login", apiController.checkLogin);
  router.post("/register-member", apiController.registerMember);

  router.post("/create-bill", billController.createBill);
  return app.use("/api/v1/", router);
}

export default initAPIRoute;