const app = require("./app.js");
const port = 4000;

app.default.listen(port, () => {
    console.log("Le serveur écoute le port " + port);
});