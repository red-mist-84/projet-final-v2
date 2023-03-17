import { createPoolConnection } from "../../config/database.js"


export async function addComment (id, author_id, theme_id, content) {
    const [info] = await createPoolConnection().query(`SELECT * FROM comments WHERE theme_id = ?`, [theme_id])
    if(info.length > 0){
        return info
    }
    return null
}

/*async function findPostComments(postId) {
    return baseRepository
        .find(`SELECT c.id, c.content, u.pseudo AS author
            FROM comments c
            INNER JOIN users u
                ON u.id = c.author_id
            WHERE post_id = ?
            ORDER BY id DESC
            `,
            [postId]
        )
}

async function insertComment({postId, userId, content}) {
    return baseRepository.insert(
        "comments", 
        ["post_id", "author_id", "content"],
        [postId, userId, content]
    )
}

export default {
    findPostComments,
    insertComment,
    ...baseRepository
}*/