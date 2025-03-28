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

// app.use(flash())

// //App login session tokens and stuff for passport.
// app.use(session({
//     key: "session",
//     secret: process.env.SESSION_SECRET,
//     store: new MYSQLStore({
//         host: "localhost",
//         port: 3306,
//         user: "root",
//         password: process.env.SQLPassword,
//         database: "cookie_user"
//     }),
//     resave: false,
//     saveUnitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }));

// //Passport stuff
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride('_method'))

const render = (res, page, locals = {}) => {
    res.render(page, locals);
};

//Connection for sql
// var connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: process.env.SQLPassword,
//     database: "user"
// });

// initializePassport(
//     passport,
//     connection
// )

//Landing pages
app.get("/", (req, res) => render(res, "index"));
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

// app.post("/account", (req, res) => {
//     const firstname = req.body.firstname.substr(0, 49);
//     const lastname = req.body.lastname.substr(0, 49);
//     const email = req.body.email.substr(0, 250);
//     const bio = req.body.bio.substr(0, 5000);
//     connection.query('UPDATE users SET firstname = ?, lastname = ?, email = ?, bio = ? WHERE id = ?', [firstname, lastname, email, bio, req.user[0].id], function (err, response, fields) {
//         if (err) {
//             return next(err)
//         }
//         res.redirect("/account");
//     });
// });


// //Sign up, login, logout pages/procedures.
// app.get("/create-organisation", (req, res) => render(res, "create-organisation"));
// app.post("/create-organisation", (req, res) => render(res, "create-organisation"));

// app.get("/register", (req, res) => render(res, "register"));

// app.post("/register", async (req, res, next) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const firstname = req.body.firstname.substr(0, 49);
//         const lastname = req.body.lastname.substr(0, 49);
//         const email = req.body.email.substr(0, 250);

//         connection.query(
//             'INSERT INTO users (firstname, lastname, email, hash) VALUES (?, ?, ?, ?)',
//             [firstname, lastname, email, hashedPassword],
//             function (err, response) {
//                 if (err) {
//                     return next(err);  // Pass error to Express error handler
//                 }

//                 // Manually authenticate the user after successful registration
//                 passport.authenticate('local', {
//                     successRedirect: "/create-organisation",
//                     failureRedirect: '/login',
//                     failureFlash: true

//                 })(req, res, next);
//             }
//         );
//     } catch (error) {
//         next(error); // Handle bcrypt hashing errors
//     }
// });

// app.get('/login', (req, res) => render(res, "login"))

// app.post('/login', passport.authenticate('local', {
//     successRedirect: "/client?page=dashboard",
//     failureRedirect: '/login',
//     failureFlash: true

// }));

// app.delete('/logout', (req, res, next) => {
//     req.logout(err => {
//         if (err) {
//             return next(err);
//         }
//         res.redirect('/login');
//     });
// });


// functio(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }

//     res.redirect("/login")
// }

// functio(req, res, next) {
//     if (req.isAuthenticated()) {
//         return res.redirect("/client?page=dashboard")
//     }

//     next()
// }

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});

