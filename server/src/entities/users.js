class Users {
  constructor(db) {
    this.db = db
  }

  // add user to database, returns userid
  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {

      var newUser = {
        login : login,
        password : password,
        lastname : lastname,
        firstname : firstname
      };

      this.db.users.insert(newUser, function(err, newDoc) {
        if(err) {
          reject();
        } else {
          resolve(newDoc._id);
        }
      });
    });
  }

  // get user data from database, returns the record
  getData(userid) {
    return new Promise((resolve, reject) => {
      this.db.users.findOne({ _id: userid }, function (err, doc) {
        if(err) {
          reject();
        } else {
          resolve(doc);
        }
      });
    });
  }

  // check if user exists, returns the record
  async exists(login) {
    return new Promise((resolve, reject) => {
      this.db.users.findOne({ login : login }, function (err, doc) {
        if(err) {
          reject();
        } else {
          resolve(doc);
        }
      });
    });
  }

  // check if password is correct, returns userid or null
  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      this.db.users.findOne({ login : login, password : password }, function (err, doc) {
        if(err) {
          reject();
        } else if (doc != null) {
          resolve(doc._id);
        } else {
          resolve(null);
        }
      });
    });
  }

  // deletes user from database
  delete(userid) {
    return new Promise((resolve, reject) => {
      this.db.users.remove({ _id: userid }, {}, function (err, numRemoved) {
        if(err) {
          reject();
        } else {
          resolve(numRemoved);
        }
      });
    });
  }

  // updates user data in database
  updateData(userid, login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      this.db.users.update({ _id: userid }, { $set: { login: login, password: password, lastname: lastname, firstname: firstname } }, {}, function (err, numReplaced) {
        if(err) {
          reject();
        } else {
          resolve(numReplaced);
        }
      });
    });
  }
  
}
  
exports.default = Users;