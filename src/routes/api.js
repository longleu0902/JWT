import express from "express";
import apiController from "../controller/apiController";
import userApiController from "../controller/userApiController";

const router = express.Router();

const initApiRoutes = (app) => {

    //rest api
    // GET-READ ,POST-CREATE ,PUT-UPDATE, DELETE-D (CRUD)
    router.get("/test-api",apiController.testApi);
    router.post("/register",apiController.handleRegister);
    router.post("/login",apiController.handleLogin);

    router.get("/user/read",userApiController.readFunc);
    router.post("/user/create", userApiController.createFunc);
    router.post("/user/update",userApiController.updateFunc);
    router.delete("/user/delete",userApiController.deleteFunc);


    return app.use("/api/v1/",router);
}
export default initApiRoutes;