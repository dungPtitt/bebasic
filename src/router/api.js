import express from "express";
import APIController from "../controller/apiController";
let router = express.Router()

const initAPIRoute = (app)=> {
  router.get("/users", APIController.getUsers)
  router.post("/create-user", APIController.createUser)
  router.put("/update-user", APIController.updateUser)
  router.delete("/delete-user/:id", APIController.deleteUser)
  return app.use("/api/v1/", router);
}

export default initAPIRoute;