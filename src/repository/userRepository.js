import { createPoolConnection } from "../../config/database.js"

// fonction qui verifie que tous les champs sont rentrée, et l'insere l'user si l'email n'existe pas.
export async function createUserDb(pseudo, email, hashedPassword){
    const err = "error create"
    const [info] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    if(info.length > 0){
        throw err
    }
    const [user] = await createPoolConnection().query(`INSERT INTO users (pseudo, email, password, roles) VALUES (?, ?, ?, "user")`, [pseudo, email, hashedPassword])
}

// fonction qui recupere la ligne user en base de donnée //
export async function connectUserDb(email){
    const [info] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    console.log(email)
    if(info.length > 0){
        return info
    }
    return null
}

// fonction pour recuperer tous les users //
export async function getAllUserDb(){
    const [list] = await createPoolConnection().query(`SELECT * FROM users`)
    return list
}

export async function getUserDb(email){
    const [list] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    return list
}

// fonction suppression users //
export async function deleteUserDb(id){
    const [userDelete] = await createPoolConnection().query(`DELETE FROM users WHERE id = ?`, [id] )
    return userDelete
}

// fonction qui enregistre les modification //
export const updateUserDb = async (id, pseudo, email) => {
    console.log(id, pseudo, email)
    const [results] = await createPoolConnection().query(`UPDATE users SET pseudo = ?, email = ? WHERE id = ?`, [pseudo, email, id],function (err, result, field){
        if (err) throw err;
    });
    return results;
};
