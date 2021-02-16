const db = require("../util/database");

module.exports = class User {
  constructor(username, email, password) {
    this.name = username;
    this.email = email;
    this.password = password;
  }

  save() {
    return db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?) ",
      [this.name, this.email, this.password]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM users");
  }
  deleteById() {}
  findById() {}
};
