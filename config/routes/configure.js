import { home, fouesnant, kerlouan, crozon, contact, login } from "./home.js"
import express from "express";
import { createUser, loginUser, logout, deleteUser } from "../../src/controller/user_controller.js";
import { isSessionActive } from "../../src/middleware/setting.js";
import { commentUser } from "../../src/controller/comment_controller.js";
import { panelPage } from "./home.js"
const router = express.Router();

    router.get("/", home)
    router.get("/fouesnant", fouesnant)
    router.get("/kerlouan", kerlouan)
    router.get("/crozon", crozon)
    router.get("/contact",contact)
    router.get("/logout", logout)
    router.get('/admin/:id', deleteUser)
    
    router.post("/comments/:idtheme", isSessionActive, commentUser) 
    router.post("/acceuil", isSessionActive, loginUser)
    router.post("/inscription", createUser)
    router.get("/admin", panelPage)
    router.post("/acceuil")
 export default router