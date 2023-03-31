import { addCommentDb, deleteCommentDb, getAllCommentDb } from "../repository/commentRepository.js"

// AJOUT DE COMMENTAIRES //
export async function commentUser(req, res) {
  const { pseudo, email, comment, theme_id } = req.body;
  
  if (theme_id && pseudo && email && comment) {
    try {
      const user_id = req.session.userId
      await addCommentDb(comment, pseudo, user_id, theme_id);
      let filteredComments = null
      await getAllCommentDb().then(listComments => {
         filteredComments = listComments.filter(comment => comment.theme_id ===  theme_id);
      })
      console.log(typeof(theme_id))
      const message = 'Commentaire enregistré.';
      switch (theme_id) {
        
        case '1' :
          console.log(filteredComments)
          res.status(200).redirect('/fouesnant')
          break;
        case '2' :
          res.status(200).redirect('/kerlouan')
          break;
        case '3' :
          res.status(200).redirect('/crozon')
          break;
          default : throw new Error('page invalide')
      } 
    } catch (err) {
      const message = 'Veuillez remplir tous les champs obligatoires';
      res.status(400).render('acceuil.html', { message });
      console.log("champs incorrect")
      console.log(err)
    }
  }
}

// DELETE COMMENT//

export function deleteComment(req, res) {
  const id = req.body.id; 
  console.log(id); 
  deleteCommentDb(id).then((result) => {
    console.log("suppression commentaire réussie");
    res.redirect("/admin");
  }).catch((error) => {
    console.error("Erreur lors de la suppression du commentaire :", error);
    res.status(500).send("Erreur lors de la suppression du commentaire");
  });
}
