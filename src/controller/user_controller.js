import { createUserDb , connectUserDb, deleteUserDb, updateUserDb, getUserDb } from "../repository/userRepository.js";
import argon2 from "argon2";
import { v4 as uuidv4 } from 'uuid';

// LOGIN //
export async function loginUser(req, res){
    const {email, password} = req.body
    if(email && password){
        try {
            const user = await connectUserDb(email);
            
            if(!user) {
                console.log("no user")
                const message = 'Veuillez entrer un email ou un mot de passe valide';
                res.status(400).render('acceuil.html', {message});
                return
            }
                
            if (!await argon2.verify(user[0].password, password)){
                console.log(user[0].password, password)
                console.log("password invalid")
                const message = 'email ou mot de passe incorrect';
                res.status(400).render('acceuil.html', {message});
                return
            }
            
            if (req.session.sessid) {
                throw new Error('session active');
                const message = 'session active';
                res.status(400).render('acceuil.html', {message});
                return
            }
            
            if (!req.session.sessid) {
                
                try {
                    console.log("connection ok")
                    console.log(user)
                    req.session.sessid = uuidv4();
                    req.session.name = user[0].pseudo
                    req.session.userId = user[0].id
                    req.session.role= user[0].roles
                    const message = 'Bienvenue';
                    res.status(200).render('acceuil.html', {message});  
                }
                catch (err) {
                    console.log(err)
                }
            }
            
            } catch(error) {
                console.error(error);
                const message = 'email ou mot de passe incorrect';
                res.status(400).render('acceuil.html', {message});
        }
    }
}

// LOGOUT //
export function logout(req, res){
    req.session.destroy(() => {
        console.log("deconnection reussie")
        res.status(200).redirect("/")
    })
}

// CREATE USER //
export async function createUser(req, res) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
    const {pseudo, email, password, confirm} = req.body;
    if (pseudo && email && password && confirm) {
        if (!emailRegex.test(email)) {
            const message = "L'email n'est pas valide.";
            return res.status(400).render('contact.html', {message});
        }
        if (password !== confirm) {
            const message = "Les mots de passe ne correspondent pas.";
            return res.status(400).render('contact.html', {message});
        }
        if (!passwordRegex.test(password) || !passwordRegex.test(confirm)) {
            const message = "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre.";
            return res.status(400).render('contact.html', {message});
        }
        
        try {
            const hashedPassword = await argon2.hash(password);
            const user = await createUserDb(pseudo, email, hashedPassword, confirm);
            req.session.sessid = uuidv4();
            req.session.name = pseudo;
            const message = 'Bienvenue, inscription réussie.';
            console.log('Inscription réussies.');
            return res.status(200).render('acceuil.html', {message});
        } catch (err) {
            const message = "Échec de la création de l'utilisateur, car il existe déjà en base de données.";
            return res.status(500).render('acceuil.html', {message});
        }
    }
}

// ADMIN //
export function loginPage(req,res){
    res.status(200).render('acceuil.html')
}

// UPDATE USER //
export async function updateUser(req, res) {
    try{
        const { id, pseudo, email } = req.body;
        await updateUserDb(id, pseudo, email);
        res.status(200).redirect('/admin')
        console.log("modification réussie")
    }catch(err){
        res.send('Update failed');
    }
}

// DELETE USER //
export function deleteUser(req, res){
    const id = req.params.id
    deleteUserDb(id).then(userDelete => {
        console.log("suppression réussie")
        res.redirect('/admin')
    })
}