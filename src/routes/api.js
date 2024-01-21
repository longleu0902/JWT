import express from "express";
import apiController from "../controller/apiController";
import userApiController from "../controller/userApiController";
import groupApiController from "../controller/groupApiController"

const router = express.Router();

const initApiRoutes = (app) => {

    //rest api
    // GET-READ ,POST-CREATE ,PUT-UPDATE, DELETE-D (CRUD)
    router.get("/test-api",apiController.testApi);
    router.post("/register",apiController.handleRegister);
    router.post("/login",apiController.handleLogin);

    router.get("/user/read",userApiController.readFunc);
    router.post("/user/create", userApiController.createFunc);
    router.put("/user/update",userApiController.updateFunc);
    router.delete("/user/delete",userApiController.deleteFunc);

    router.get("/group/read",groupApiController.readFunc);



    return app.use("/api/v1/",router);
}
export default initApiRoutes;