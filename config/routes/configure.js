import { home, fouesnant, kerlouan, crozon, contact, admin } from "./home.js"
/*import { blog, slug } from "./blog.js"*/
/*import { indexPosts, admin } from "./admin/dashboard.js"
import { login, logout} from "./security.js"
import accessChecker from '../../security/accessCheckers.js'*/

export function configRoutes(app) {
    app.get("/",home)
    app.get("/fouesnant", fouesnant)
    app.get("/kerlouan", kerlouan)
    app.get("/crozon", crozon)
    app.get("/contact",contact)
    app.get("/admin", admin)
    
    app.post("/comments/:idtheme") 
    
    /*app.get("/login", accessChecker.isNotLogged, login)
    app.post("/login", accessChecker.isNotLogged, login)
    app.get('/logout', accessChecker.isLogged, logout)
    app.get('/admin/posts', accessChecker.isLogged, indexPosts)
    app.get("/admin", accessChecker.isLogged, admin)
    app.get("/blog/:slug", slug)*/
}