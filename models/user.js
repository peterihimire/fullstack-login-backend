const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;

// const db = require("../util/database");

// module.exports = class User {
//   constructor(username, email, password) {
//     this.name = username;
//     this.email = email;
//     this.password = password;
//   }

//   save() {
//     return db.execute(
//       "INSERT INTO users (name, email, password) VALUES (?, ?, ?) ",
//       [this.name, this.email, this.password]
//     );
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM users");
//   }

//   static findById(id) {
//     return db.execute("SELECT * FROM users WHERE users.id= ?", [id]);
//   }

//   static updateById(id) {
//     return db.execute("UPDATE users SET name =?, email =?, password =?  WHERE users.id = ?", [id]);
//   }
//   static deleteById(id) {
//     return db.execute("DELETE FROM users WHERE users.id= ?", [id]);
//   }
// };

// "UPDATE users SET name=?, email=?, password=?  WHERE users.id = ?",
// "UPDATE users (name, email, password ) VALUES (?, ?, ?) WHERE users.id= ?",
