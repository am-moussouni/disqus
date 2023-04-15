const path = require('path');
const api = require('./api.js');
const cors = require('cors');

var Datastore = require('nedb');
db = {};
db.users = new Datastore("server/users.db");
db.messages = new Datastore("server/messages.db");
db.users.loadDatabase();
db.messages.loadDatabase();

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug("Base directory: " + basedir);

express = require('express');
const app = express();
api_1 = require("./api.js");
const session = require("express-session");

app.use(session({
    secret: "disqus server"
}));

app.use(cors({origin:'*'}));

app.use('/api', api.default(db));

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;