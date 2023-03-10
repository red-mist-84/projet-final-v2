import { getPoolConnexion } from "../config/database.js";

async function find(sql, args = [], onlyOne = false) {
    try {
        const [rows] = await getPoolConnexion()
            .query(sql, args)
            
        return onlyOne ? rows[0] : rows
    } catch (error) {
        console.error(error)
    }

    return onlyOne ? null : []
}

async function findOne(sql, args = []) {
    return find(sql, args, true)
}

async function findAll(table) {
    return find(`SELECT * FROM ${table}`)
}

async function insert(table, fields, values) {
    // 1) .map(v => "?") on retourne un tableau qui a remplacé toutes les valeurs
    // par des points d'interrogation 
    // 2) .join(",") on créer une chaîne de caractère reliant tous ces markers 
    // avec des "," (.join)
    // ["id", "content"] = (?,?)
    const valuesMarkers = values.map(v => "?").join(",")

    return getPoolConnexion()
        .query(`INSERT INTO ${table} (${fields.join(",")}) VALUES (${valuesMarkers})`, values)
}

// table, id, {fields: values}
// SET field1 = 1, field2 = 2
async function update(table, id, entries) {
    const sql = "UPDATE SET key=value, key2=value2 WHERE id = "
    return getPoolConnexion()
        .query(sql, entries)
}

export default {
    find,
    findOne,
    findAll,
    insert
}
