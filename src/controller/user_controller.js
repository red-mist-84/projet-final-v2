import { createUserDb , connectUserDb, deleteUserDb, updateUserDb } from "../repository/userRepository.js"
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
            const message = 'Bienvenue ,inscription réussi.'
            res.status(200).render('acceuil.html', {message})
        })
        .catch(err => {
           const message = 'Echec de la création de l utilisateur, car il existe déja en base de donnée.'
           res.status(500).render('acceuil.html', {message})
        })
    }
}

export function loginUser(req, res){
    const {email, password} = req.body
    console.log(req.body)
    if(email && password){
        connectUserDb(email).then(async user => {
            console.log(user[0].password)
            const isPasswordValid = await argon2.verify(user[0].password, password)
            if (isPasswordValid) {
                if (!req.session.sessid) {
                    
                    req.session.sessid = uuidv4()
                }
                const message = 'Bienvenue'
               res.status(200).render('acceuil.html', {message})
            }
        })
        .catch(err => {
           console.error(err)
           const message = 'email ou mot de passe incorrect'
           res.status(500).render('/', {message})
        })
    }
}

export function deleteUser(req, res){
    const id = req.params.id
    deleteUserDb(id).then(userDelete => {
        console.log(userDelete)
        res.redirect('/admin')
    })
}

export function updateUser(req, res){
    const id = req.params.id
    updateUserDb(id).then(userUpdate => {
        console.log(userUpdate)
        res.redirect('/admin')
    })
}

export function logout(req, res){
    req.session.destroy()
    res.status(200).redirect("/")
}