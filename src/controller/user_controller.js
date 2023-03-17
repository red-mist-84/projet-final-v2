/*import { createPoolConnection } from "../../config/database.js"
import { createSession, clearSession } from "../security/session.js"*/
import { createUserDb , connectUserDb } from "../repository/userRepository.js"
import argon2 from "argon2"
import { v4 as uuidv4 } from 'uuid';

export function loginPage(req,res){
    res.status(200).render('acceuil.html')
}

export async function createUser(req,res){
    const {pseudo, email, password, confirm} = req.body
    if(pseudo && email && password && confirm){
        const hashedPassword = await argon2.hash(password)
        createUserDb (pseudo, email, hashedPassword, confirm)
        .then(user => {
            req.session.sessid = uuidv4() /*crée une session*/
            req.session.name = pseudo
            res.status(200).redirect('/admin')
        })
        .catch(err => {
           console.error(err)
           const message = 'Echec de la création de l utilisateur, car il existe déja en base de donnée.'
           res.status(500).render('acceuil.html', {message})
        })
    }
}

export function connectUser(req, res){
    const {email, password} = req.body
    console.log(req.body)
    if(email && password){
        connectUserDb(email).then(async user => {
            console.log(user[0].password)
            console.log("dgsfhdgj")
            const isPasswordValid = await argon2.verify(user[0].password, password)
            if (isPasswordValid) {
                if (!req.session.sessid) {
                    
                    req.session.sessid = uuidv4()
                }
                res.status(200).redirect('/admin')
            }
        })
        .catch(err => {
           console.error(err)
           const message = 'email ou mot de passe incorrect'
           res.status(500).render('acceuil.html', {message})
        })
    }
}

export function logout(req, res){
    req.session.destroy()
    res.status(200).redirect("/")
}