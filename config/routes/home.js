import { article } from "../../src/repository/articleRepository.js"
import { getAllUser } from "../../src/repository/userRepository.js"
import argon2 from 'argon2'

export function home(req, res) {
    console.log(req.session)
    res.render("acceuil.html")
}

export function panelPage(req, res) {
    getAllUser().then(lists => {
        res.render(`admin.html`, {lists})
    })
}

export async function fouesnant(req, res) {
    const [articles] = await article(1)
    res.render("fouesnant.html", {articles})
}

export async function kerlouan(req, res) {
    const [articles] = await article(2)
    res.render("kerlouan.html", {articles})
}

export async function crozon(req, res) {
    const [articles] = await article(3)
    res.render("crozon.html", {articles})
}

export async function contact(req, res) {
    res.render("contact.html")
}

export async function login(req, res) {
    console.log(req.session)
    res.render("acceuil.html")
}
