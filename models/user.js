const fs = require("fs");
const path = require("path");
const db = require("../db.json");

class User {
  constructor(email, name, password) {
    this.email = email;
    this.name = name;
    this.password = password;
  }

  saveToDb() {
    const dbUsers = db.users;
    const newDbUsers = [
      ...dbUsers,
      {
        email: this.email,
        name: this.name,
        password: this.password,
      },
    ];
    const newDb = { ...db, users: newDbUsers };

    fs.writeFileSync(path.join(__dirname, "../db.json"), JSON.stringify(newDb));
  }

  toJson() {
    return JSON.stringify({
      email: this.email,
      name: this.name,
      password: this.password,
    });
  }
}

module.exports = User;
