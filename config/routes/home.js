import { getAllUserDb } from "../../src/repository/userRepository.js"
import { getAllCommentDb } from "../../src/repository/commentRepository.js"

export function home(req, res) {
    res.render("acceuil.html")
}

export function fouesnantPage(req, res) {
  getAllCommentDb().then(listComments => {
    const filteredComments = listComments.filter(comment => comment.theme_id === 1);
    res.render(`fouesnant.html`, { comments: filteredComments });
  }).catch(error => {
    console.error(error);
    res.sendStatus(500);
  });
}

export function kerlouanPage(req, res) {
  getAllCommentDb().then(listComments => {
    const filteredComments = listComments.filter(comment => comment.theme_id === 2);
    res.render(`kerlouan.html`, { comments: filteredComments });
  }).catch(error => {
    console.error(error);
    res.sendStatus(500);
  });
}

export function crozonPage(req, res) {
  getAllCommentDb().then(listComments => {
    const filteredComments = listComments.filter(comment => comment.theme_id === 3);
    res.render(`crozon.html`, { comments: filteredComments });
  }).catch(error => {
    console.error(error);
    res.sendStatus(500);
  });
}

export async function contact(req, res) {
    res.render("contact.html")
}

export async function login(req, res) {
    res.render("acceuil.html")
}

export function panelPage(req, res) {
    getAllUserDb().then(lists => {
        getAllCommentDb().then(listComments => {
            res.render(`admin.html`, {lists, listComments});   
        })
    }).catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
}
