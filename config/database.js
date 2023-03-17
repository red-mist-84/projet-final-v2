import mysql from "mysql2"

const options = {
    user: "mickaelboudon",
    host: "db.3wa.io",
    password: "ae19aa78625a716f4da53706722dc471",
    database: "mickaelboudon_tabletest"
}

export function createClassicConnexion() {
    return mysql.createConnection(options)
}

let pool = null
export function createPoolConnection() {
    if (pool) {
        return pool
    }
    
    pool = mysql.createPool(options).promise()
    
    return pool
}