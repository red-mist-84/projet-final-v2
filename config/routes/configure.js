import { home, fouesnant, kerlouan, crozon, contact, admin } from "./home.js"
import express from "express";
import { createUser, connectUser, logout } from "../../src/controller/user_controller.js";
import { isSessionActive } from "../../src/middleware/setting.js";
const router = express.Router();

    router.get("/", home)
    router.get("/fouesnant", fouesnant)
    router.get("/kerlouan", kerlouan)
    router.get("/crozon", crozon)
    router.get("/contact",contact)
    router.get("/admin", admin)
    
    router.post("/comments/:idtheme") 
    router.post("/admin", isSessionActive, connectUser)
    router.post("/inscription", createUser)
    
    router.get("/logout", logout)
    
 export default router