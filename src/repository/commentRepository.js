import baseRepository from "./baseRepository.js"

async function findPostComments(postId) {
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
}