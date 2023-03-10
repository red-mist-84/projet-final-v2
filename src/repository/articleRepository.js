import { getPoolConnexion } from "../../config/database.js"

export async function article (themeId) {
    const article = await getPoolConnexion ().query("SELECT * FROM articles WHERE theme_id = ?",[themeId])
    return article
}