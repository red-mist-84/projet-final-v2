import express from "express";
import dotenv from 'dotenv';
import ejs from "ejs";
import path from "path";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import router from "./config/routes/configure.js";
import setting from './src/middleware/setting.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 1000*60*60*60
    },
}))
app.set("views", path.join(process.cwd(), "templates"))
app.engine("html", ejs.__express)

app.locals.title = "Blog Bretagne"
app.locals.scripts = []
app.locals.styles = []

app.use(express.static('public'))

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(setting)
app.use(router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listen on port: ${PORT}`)
})