import { addComment } from "../repository/commentRepository.js"

export function commentUser(req, res){
    try {
        const {email, pseudo, comment} = req.body
        console.log(req.body)
        if(email && pseudo && comment){
            addComment(email,pseudo,comment)
        }
    }catch(err) {
        console.error(err)
        const message = 'email ou mot de passe incorrect'
        res.status(500).render('acceuil.html', {message})
    }
}