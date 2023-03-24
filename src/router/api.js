import express from "express";
import accountController from "../controller/accountController";

let router = express.Router()

const initAPIRoute = (app)=> {
  // router.get("/users", APIController.getUsers)
  // router.post("/create-user", APIController.createUser)
  // router.put("/update-user", APIController.updateUser)
  // router.delete("/delete-user/:id", APIController.deleteUser)
  router.get("/get-all-acc", accountController.getAllAccount);
  return app.use("/api/v1/", router);
}

export default initAPIRoute;