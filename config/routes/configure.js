import { home, fouesnantPage, kerlouanPage, crozonPage, contact, panelPage } from "./home.js"
import { createUser, loginUser, logout, deleteUser, updateUser } from "../../src/controller/user_controller.js";
import { commentUser, deleteComment } from "../../src/controller/comment_controller.js";
import { isSessionActive, isUserAdmin } from "../../src/middleware/setting.js";

import express from "express";
import fetch from 'node-fetch';
const router = express.Router();

    // PAGE //
    router.get("/", home)
    router.get("/fouesnant", fouesnantPage)
    router.get("/kerlouan", kerlouanPage)
    router.get("/crozon", crozonPage)
    router.get("/contact",contact)
    
    // LOGIN, CREATE//
    router.post("/acceuil", isSessionActive, loginUser)
    router.post("/inscription", createUser)
    router.get("/logout", logout)
    
    // COMMENTS //
    router.post("/comments/new", commentUser);

    // ADMIN //
    router.get("/admin", isUserAdmin, panelPage)
    router.get('/admin/:id', deleteUser)
    router.post('/updateUser', updateUser)
    router.post('/deleteComment', deleteComment)
    
 export default router