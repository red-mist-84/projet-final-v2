import { createPoolConnection } from "../../config/database.js"

export async function article (themeId) {
    const article = await createPoolConnection ().query("SELECT * FROM articles WHERE theme_id = ?",[themeId])
    return article
}