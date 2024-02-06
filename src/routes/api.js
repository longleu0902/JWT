import express from "express";
import apiController from "../controller/apiController";
import userApiController from "../controller/userApiController";
import groupApiController from "../controller/groupApiController";
import roleApiController from "../controller/roleApiController"
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction"

const router = express.Router();
// const checkUserLogin = (req ,res , next) => {
//     const nonSecurePaths = ['/', '/register', '/login'];
//     if (nonSecurePaths.includes(req.path)) return next();

//     //authenticate user
//     next();

// }

const initApiRoutes = (app) => {

    router.all('*', checkUserJWT, checkUserPermission);

    //rest api
    // GET-READ ,POST-CREATE ,PUT-UPDATE, DELETE-D (CRUD)
    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);

    router.get("/account", userApiController.getUserAccount)

    //user router
    router.get("/user/read", userApiController.readFunc);
    router.post("/user/create", userApiController.createFunc);
    router.put("/user/update", userApiController.updateFunc);
    router.delete("/user/delete", userApiController.deleteFunc);

    //roles router
    router.get("/role/read", roleApiController.readFunc);
    router.post("/role/create", roleApiController.createFunc);
    router.put("/role/update", roleApiController.updateFunc);
    router.delete("/role/delete", roleApiController.deleteFunc);
    router.get("/role/by-group/:groupId", roleApiController.getRoleByGroup);
    router.post("/role/assign-to-group", roleApiController.assignRole);





    //group router
    router.get("/group/read", groupApiController.readFunc);



    return app.use("/api/v1/", router);
}
export default initApiRoutes;