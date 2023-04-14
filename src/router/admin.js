import express from "express";
import homeController from "../controller/homeController";
import accountController from "../controller/accountController";
import productController from "../controller/productController";
import loginService from "../services/loginService";


let router = express.Router()
     
let checkLogin = async(req, res, next)=>{
  if(req.cookies.token){
    // neu da da nhap thi phai check quyen
    let idAuth = req.cookies.idAuth;
    if(idAuth==1){
      return next();
    }
    // let response = await loginService.checkAuth(token);
    // if(response.data.errCode==0 && response.data.idAuth==1){
    //   next();
    //   return;
    // }
  }
  return res.redirect("/login");
}

const initAdminRoute = (app)=> {
  router.get("/", homeController.getAdminPage);
  router.get("/account", homeController.getManageAccount);
  router.get("/product", homeController.getManageProduct);

  router.post("/create-acc", accountController.createAccWeb);
  router.get("/edit-add-acc", accountController.getEditAcc);
  router.post("/update-acc", accountController.getUpdateAcc);
  router.get("/delete-acc", accountController.deleteAccWeb);

  router.post("/create-product", productController.createProductWeb);
  router.get("/edit-add-product", productController.getEditAddProduct);
  router.post("/update-product", productController.updateProductWeb);
  router.get("/delete-product", productController.deleteProductWeb);
  return app.use("/admin/", checkLogin, router);
}

export default initAdminRoute;