import  { createPoolConnexion } from "../database.js"
import { createSession, clearSession } from "../../security/session.js"
import argon2 from "argon2"

export async function login(req, res, next) {
    if (req.method === "GET") {
        return res.render("security/login.html" , { authentication_error: "" })
    }
    
    const [users] = await createPoolConnexion()
        .query("SELECT * FROM users WHERE email = ?", [req.body.email])
    
    if (users.length > 0) {
        try {
            const { password: hash, ...user } = users[0]
            
            if (!(await argon2.verify(hash, req.body.password))) {
                throw new Error("Invalid password")
            }
            
            await createSession(res, user);
        
            return res.redirect('/admin')
        } catch (e) {
            console.error(e)
        }
    }
    
    res.render(`security/login.html`, { authentication_error: "Email ou mot de passe invalide" })
}

export async function logout(req, res) {
  await clearSession(res, req.auth.sessid)

  res.redirect('/login')
}