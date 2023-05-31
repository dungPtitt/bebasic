import express from "express";
import accountController from "../controller/accountController";
import productController from "../controller/productController";
import billController from "../controller/billController";
import feedbackController from "../controller/feedbackController";
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
  router.get("/get-group-product", productController.getProductByGroup);

  router.post("/login", apiController.checkLogin);
  router.post("/register-member", apiController.registerMember);
  router.post("/change-password", apiController.changePassword);
  router.post("/forgot-password", apiController.forgotPassword);

  router.post("/create-bill", billController.createBill);
  router.get("/get-bill", billController.getBill);
  router.post("/create-feedback", feedbackController.createFeedback);
  router.get("/get-feedback", feedbackController.getFeedback);

  return app.use("/api/v1/", router);
}

export default initAPIRoute;