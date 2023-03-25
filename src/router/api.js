import express from "express";
import accountController from "../controller/accountController";

let router = express.Router()
     
const initAPIRoute = (app)=> {
  router.get("/get-acc", accountController.getAcc);
  router.post("/create-acc", accountController.createAcc);
  router.put("/update-acc", accountController.updateAcc);
  // router.delete("/api/delete-acc", accountController.deleteAcc);
  return app.use("/api/v1/", router);
}

export default initAPIRoute;