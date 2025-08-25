const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const User = require("./User");

const app = express();
const db = new sqlite3.Database("./theRecords.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to database.");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// === Create table if not exists ===
db.run(`CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    email TEXT,
    creation_date TEXT,
    logged_in_status INTEGER
)`);

// === Show Signup Form ===
app.get("/", (req, res) => {
    res.render("signup");
});

// === Handle Form Submission (FINAL) ===
// === Handle Form Submission (FINAL) ===
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    const createDate = new Date().toISOString();
    const loggedInStat = 1; // user just signed up, mark as online

    if (!username || !email || !password) {
        return res.send("⚠ Please fill in all fields!");
    }

    const newUser = new User(username, password, email, createDate, loggedInStat);

    const sql = `INSERT INTO user(username, password, email, creation_date, logged_in_status) VALUES(?,?,?,?,?)`;
    db.run(sql, [newUser.getUserName(), newUser.getPassword, newUser.getEmail, newUser.getCreatedAt, newUser.getLoggedStat],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.send("Error adding user to database.");
            }

            // Get the last inserted user ID
            const userId = this.lastID;

            // Fetch the inserted user to display on profile
            db.get(`SELECT * FROM user WHERE id = ?`, [userId], (err, row) => {
                if (err) {
                    console.error(err.message);
                    return res.send("Error fetching user profile.");
                }
                res.render("profile", { user: row });
            });
        });
});


// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));