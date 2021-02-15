// const users = [];
// used above when saving with array
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "users.json"
);

module.exports = class User {
  constructor(username, email, password) {
    this.name = username;
    this.email = email;
    this.password = password;
  }

  save() {
    // users.push(this);
    // used above when saving with array

    fs.readFile(p, (err, fileContent) => {
      // console.log(fileContent);
      let users = [];
      if (!err) {
        // parse method takes incomming json and gives us a javascript array or object or whatever is in the file while stringify method takes in javascript object or array and converts it to json
        users = JSON.parse(fileContent);
      }
      users.push(this);
      fs.writeFile(p, JSON.stringify(users), (err) => {
        console.log(err);
      });
      console.log(users);
    });
  }

  // cbf refers to the anonymous function we passed in through fetchAll
  // The anonymous function expects an argument, in the case of error, it will display and empty array, but if everything goes right it will parse in the expected argument which is an array , then the function knows how to deal with it.
  static fetchAll(cbf) {
    // return users;
    // used above when saving with array

    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cbf([]);
      }
      cbf(JSON.parse(fileContent));
    });
  }
};
