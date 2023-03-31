import { createPoolConnection } from "../../config/database.js"

export async function addCommentDb(comment, pseudo, user_id, theme_id){
    const err = "error add comment"
    try { 
      await createPoolConnection().query(
        `INSERT INTO comments (comment, pseudo, user_id, theme_id) VALUES (?, ?, ?, ?)`, 
        [comment, pseudo, user_id, theme_id])
}
  catch(err){
    console.log(err)
  }
}

export async function deleteCommentDb(theme_id, pseudo, user_id, comment) {
  const [result] = await createPoolConnection().query(
    `DELETE FROM comments WHERE id = ?`,
    [theme_id, pseudo, user_id, comment]
  );
  return result
}

export async function getAllCommentDb(user_id, pseudo, comment){
  const [listComment] = await createPoolConnection().query(
    `SELECT * FROM comments`)
    return listComment
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Jointure user -> comment -> page//

/*export const getAllCommentsWithUsers = async () => {
  try {
    const [comments] = await createPoolConnection().query(`
      SELECT comments.*, users.pseudo, users.email 
      FROM comments 
      RIGHT JOIN users ON comments.user_id = users.id
    `);
    return comments;
  } catch (error) {
    console.error(error);
  }
};*/ 

/*export const getCommentsWithUsersByThemeId = async (themeId) => {
  try {
    const [comments] = await createPoolConnection().query(`
      SELECT comments.*, users.pseudo 
      FROM comments 
      INNER JOIN users ON comments.user_id = users.id
      WHERE comments.theme_id = ?
    `, [themeId]);
    return comments;
  } catch (error) {
    console.error(error);
  }
};*/

/*export const getCommentsWithThemesByUserId = async (userId) => {
  try {
    const [comments] = await createPoolConnection().query(`
      SELECT comments.*, themes.title 
      FROM comments 
      INNER JOIN themes ON comments.theme_id = themes.id
      WHERE comments.user_id = ?
    `, [userId]);
    return comments;
  } catch (error) {
    console.error(error);
  }
};*/