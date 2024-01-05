import express from "express";
import apiController from "../controller/apiController"

const router = express.Router();

const initApiRoutes = (app) => {

    //rest api
    // GET-READ ,POST-CREATE ,PUT-UPDATE, DELETE-D (CRUD)
    router.get("/test-api",apiController.testApi);
    router.post("/register",apiController.handleRegister);



    return app.use("/api/v1/",router);
}
export default initApiRoutes;