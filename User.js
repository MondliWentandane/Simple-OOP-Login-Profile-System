//=== Here is my Class ===
class User {
    //== Here is my constructor for accessing the class;
    constructor(username, password, email, createdAt, loggedInStat) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
        this.loggedInStat = loggedInStat;
    }

    //== Here are my getters and setters for accessing my data individually if necessary....
    get getUserName() { return this.username }
    set setUserName(newName) { this.username = newName }

    get getPassword() { return this.password }
    set setPassword(newPass) { this.password = newPass }

    get getEmail() { return this.email }
    set setEmail(newEmail) { this.email = newEmail }

    get getCreatedAt() { return this.createdAt }
    set setCreatedAt(theDate) { this.createdAt = theDate }

    get getLoggedStat() { return this.loggedInStat }
    set setLoggedInStat(stat) { this.loggedInStat = stat }
}


module.exports = User;