const users = [];

module.exports = class User {
  constructor(username, email, password) {
    this.name = username;
    this.email = email;
    this.password = password;
  }

  save() {
    users.push(this);
  }

  static fetchAll() {
    return users;
  }
};
