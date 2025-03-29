if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const passport = require("passport");
const flash = require('express-flash');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const methodOverride = require('method-override');


const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');

const initializePassport = require('./passport-config');

const users = []

const app = express();
const PORT = 1337;

const mysql = require('mysql2');
const fs = require('fs');


//ejs setup + Filepaths
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views-org')]);

//This first one passes the client side requests to body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);


const render = (res, page, locals = {}) => {
    res.render(page, locals);
};

//Landing pages
app.get("/", (req, res) => {
    render(res, "index")

});
// app.get("/pricing", (req, res) => render(res, "pricing"));
app.get("/about", (req, res) => render(res, "about"));
app.get("/resources", (req, res) => render(res, "resources"));
// app.get("/services", (req, res) => render(res, "services"));
app.get("/contact", (req, res) => render(res, "contact"));
app.get("/demo", (req, res) => render(res, "demo"));

//Client pages
app.get("/client", (req, res) => {
    render(res, req.query.page || "dashboard")
});

app.get("/account", (req, res) => {
    render(res, "account")
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});

