import express from "express";
import dotenv from 'dotenv';
import ejs from "ejs";
import path from "path";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2'
import { getPoolConnexion } from "./config/database.js"
import { configRoutes } from "./config/routes/configure.js"

/*import { tryAuthentication } from './src/security/session.js';*/

dotenv.config()

const app = express()
const PORT = 3000
const TOKEN_KEY = "azertyuiop123456789"
const maxAge = 3 * 24 * 60 * 60 * 1000

app.engine("html", ejs.__express)
app.locals.title = "Blog Bretagne"
app.locals.scripts = []
app.locals.styles = []

configRoutes(app)

app.use(express.static('public'))
app.set("views", path.join(process.cwd(), "templates"))

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
/*app.use(tryAuthentication);*/

//login//
app.post("/login", bodyParser.json(), async (req, res) =>{
   const {email, password} = req.body
   console.log(email, password)
   if (email && password) {
       const [user] = await getPoolConnexion().query(`SELECT * FROM users WHERE email = ?`,[email])
       if (user && user[0].password === password){
            jwt.sign({
                id: user[0].id,
                name: user[0].pseudo,
                email: user[0].email,
            },TOKEN_KEY, {}, (err, token) => {
                if (err) throw err
                res.cookie("cookiedanslesac", token, {
                    sameSite: "none", secure: true, maxAge: maxAge
                })/*.json({id:user[0].id, name:user[0].pseudo})*/
                return res.redirect("/admin");
            })    
       }
   }
})

//connecting//
app.post("/inscription", bodyParser.json(), async (req, res) =>{
    const {pseudo, email, password, confirm} = req.body
    console.log(pseudo, email, password, confirm)
    if (pseudo && email && password && confirm) {
        const [user] = await getPoolConnexion().query(`SELECT * FROM users WHERE email = ?`,[email])
        if (user.length) {
           res.status(300).json("user existe deja") 
        } else {
            const hashedPassword = await argon2.hash(password);
            const query = `INSERT INTO users (id, pseudo, email, password) VALUES (?, ?, ?, ?)`;
            const values = [null, pseudo, email, hashedPassword];
            await getPoolConnexion().query(query, values);
            res.status(200).redirect("/admin");
            console.log(values)
        }
    }
})

app.listen(PORT, () => {
    console.log(`Listen on port: ${PORT}`)
})
