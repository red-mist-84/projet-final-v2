import { createPoolConnection } from "../../config/database.js"

export async function createUserDb(pseudo, email, hashedPassword){
    const [info] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    if(info.length > 0){
        return null
    }
    const [user] = await createPoolConnection().query(`INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)`, [pseudo, email, hashedPassword])
}

export async function connectUserDb(email){
    const [info] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    console.log(info)
    if(info.length > 0){
        return info
    }
    return null
}

export async function addComment (id, author_id, theme_id, content) {
    const [info] = await createPoolConnection().query(`SELECT * FROM comments WHERE theme_id = ?`, [theme_id])
    if(info.length > 0){
        return info
    }
    return null
}