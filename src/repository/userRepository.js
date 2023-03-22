import { createPoolConnection } from "../../config/database.js"

// fonction qui verifie que tous les champs sont rentrée, et l'insere l'user si l'email n'existe pas.
export async function createUserDb(pseudo, email, hashedPassword){
    const err = "error create"
    const [info] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    if(info.length > 0){
        throw err
    }
    const [user] = await createPoolConnection().query(`INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)`, [pseudo, email, hashedPassword])
}

// fonction qui recupere la ligne user en base de donnée //
export async function connectUserDb(email){
    const [info] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    console.log(info)
    if(info.length > 0){
        return info
    }
    return null
}

// fonction pour recuperer tous les users //
export async function getAllUser(){
    const [list] = await createPoolConnection().query(`SELECT * FROM users`)
    return list
}

// fonction suppression users //
export async function deleteUserDb(id){
    const [userDelete] = await createPoolConnection().query(`DELETE FROM users WHERE id = ?`, [id] )
    return userDelete
}

// fonction modification users //
export async function updateUserDb(id){
    const [userUpdate] = await createPoolConnection().query(`DELETE FROM users WHERE id = ?`, [id] )
    return userUpdate
}