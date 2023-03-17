import { article } from "../../src/repository/articleRepository.js"
import jwt from 'jsonwebtoken';
import argon2 from 'argon2'
import { createPoolConnection } from "../../config/database.js";

export function home(req, res) {
    console.log(req.session)
    res.render("acceuil.html")
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

export async function admin(req, res) {
    console.log(req.session)
    res.render("admin.html")
}
