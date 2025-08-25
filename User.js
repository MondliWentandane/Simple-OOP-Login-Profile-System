class User {
    constructor(username, password, email, createdAt, loggedInStat) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
        this.loggedInStat = loggedInStat;
    }

    get getUserName() { return this.username }
    get getPassword() { return this.password }
    get getEmail() { return this.email }
    get getCreatedAt() { return this.createdAt }
    get getLoggedStat() { return this.loggedInStat }
}
module.exports = User;
