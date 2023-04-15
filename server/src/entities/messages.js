class Messages {
    constructor(db) {
      this.db = db
    }
  
    // add message to database, returns message_id
    create(user_id, content) {
      return new Promise((resolve, reject) => {
  
        var newMessage = {
          user_id : user_id,
          content: content
        };
  
        this.db.messages.insert(newMessage, function(err, newDoc) {
          if(err) {
            reject();
          } else {
            resolve(newDoc._id);
          }
        });
      });
    }

    // get message data from database, returns the record
    getData(message_id) {
        return new Promise((resolve, reject) => {
            this.db.messages.findOne({ _id: message_id }, function (err, doc) {
                if(err) {
                    reject();
                } else {
                    resolve(doc);
                }
            });
        });
    }

    // deletes message from database
    delete(message_id) {
        return new Promise((resolve, reject) => {
            this.db.messages.remove({ _id: message_id }, {}, function (err, numRemoved) {
                if(err) {
                    reject();
                } else {
                    resolve(numRemoved);
                }
            });
        });
    }

    // updates message in database
    updateContent(message_id, content) {
        return new Promise((resolve, reject) => {
            this.db.messages.update({ _id: message_id }, { $set: { content: content } }, {}, function (err, numReplaced) {
                if(err) {
                    reject();
                } else {
                    resolve(numReplaced);
                }
            });
        });
    }

    // get all messages from user, returns a list of message records
    getUserMessages(user_id) {
        return new Promise((resolve, reject) => {
            this.db.messages.find({ user_id : user_id }, function (err, docs) {
                if(err) {
                  reject();
                } else {
                  resolve(docs);
                }
              });
        });
    }
}

exports.default = Messages;