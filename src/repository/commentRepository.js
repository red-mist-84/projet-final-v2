import { createPoolConnection } from "../../config/database.js"

export async function addComment(pseudo, email, comment) {
  const [result] = await createPoolConnection().query(
    `INSERT INTO comments (pseudo, email, comment) VALUES (?, ?, ?)`,
    [pseudo, email, comment]
  );
  return result
}

//export async function deleteComment ()//
export async function supComment(pseudo, email, comment) {
  const [result] = await createPoolConnection().query(
    `DELETE INTO comments (pseudo, email, comment) VALUES (?, ?, ?)`,
    [pseudo, email, comment]
  );
  return result
}