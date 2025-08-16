//== Here ar all the necessary imports =====
const User = require(`./User`);


//=== Here I am creating the Database that we will work with ===
// This line here I am importing the SQLite3 Library in Node.js
// The verbose method helps me catch error and be able to see what happening behind the sceen in SQLite3
const sqlite3 = require('sqlite3').verbose();
let sql;

// Bellow I am creating a constructor that opens or create the database.
// The 
const db = new sqlite3.Database('./theRecords.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.log(err.message);
});

// Now I will create a table by uncommenting the following code
// Please uncomment if you don't have a table yet, then run (node middleMan.js) on a terminal to create
// After running, the table will be there then comment the following code again.
/*sql = `CREATE TABLE user(id INTEGER PRIMARY KEY, username,password,email,creation_date,logged_in_status)`;
db.run(sql);*/

// The nect line of code. uncomment it if you want to delete the table
/* db.run(`DROP TABLE user`);*/



//== From the Sign Up Page
function registerUser(){
    let userName = document.getElementById("username").value;
    let userEmail = document.getElementById("email").value;
    let newPass = document.getElementById("newUserPass").value;
    let createDate = new Date().toISOString();
    let loggedInStat = 0;

    if(!userName || !userEmail || !newPass){
        alert("Please fill in all the fields..!!!");
        return;
    }

    //=== Next os the object that will hold the user details
    const newUser = new User(userName, newPass, userEmail, createDate, loggedInStat);
    
    //== Now I will use SQL to insert the users data
    sql = `INSERT INTO user(username, password, email, creation_date, logged_in_status) VALUES(?,?,?,?,?)`;
    db.run(sql,[newUser.getUserName(),newUser.getPassword(),newUser.getEmail(),
               newUser.getCreatedAt(),newUser.getLoggedStat()],
               (err)=>{if(err) return console.log(err.message)});

     alert(`New User Successfully Added to the DataBase...`)          
}


