const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");
const Friends = require("./entities/friends.js");

function init(db) {
    const router = express.Router();
    // on utilise JSON
    router.use(express.json());

    // middleware affichant toutes les requêtes sur la console
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });

    /* ********************************************************************** */
    /* ****************************** USERS ********************************* */
    /* ********************************************************************** */

    // requêtes sur les utilisateurs (users.js)
    const users = new Users.default(db);

    /* --------------- CREATE USER -------------- */
    
    router.put("/user", (req, res) => {
        const { login, password, lastname, firstname } = req.body;

        if (!login || !password || !lastname || !firstname) {
            res.status(400).json({
                status : 400,
                message : "missing fields"
            });
        } else {
            users.create(login, password, lastname, firstname)
                .then((user_id) => res.status(201).json({
                    status : 201,
                    message : "user created",
                    id : user_id
                }))
                .catch((e) => res.status(500).json({
                    status : 500,
                    message : "internal error"
                }));
        }
    });

    /* --------------- LOGIN -------------- */

    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                res.status(400).json({
                    status : 400,
                    message : "missing fields"
                });
                return;
            }
            if(! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "unknown user"
                });
                return;
            }
            let userid = await users.checkpassword(login, password);
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (e) {
                    if (e) {
                        res.status(500).json({
                            status: 500,
                            message: "internal error"
                        });
                    } else {
                        // nouvelle session créée
                        req.session.id = userid;
                        res.status(200).json({
                            status: 200,
                            message: "user successfully logged in"
                        });
                    }
                });
                return;
            }
            // faux login ou password
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "login or password incorrect"
            });
            return;
        }
        catch (e) {
            // erreur interne
            res.status(500).json({
                status: 500,
                message: "internal error"
            });
        }
    });

    /* --------------- GET USER DATA -------------- */

    router.get("/user/:user_id", async (req, res) => {
        try {
            const user = await users.getData(req.params.user_id);
            if (!user) {
                res.status(404).json({
                    status: 404,
                    message: "unknown user"
                });
            } else {
                res.send(user);
            }
        }
        catch (e) {
            res.status(500).json({
                status: 500,
                message: "internal error"
            });
        }
    })

    /* --------------- LOGOUT -------------- */

    router.delete("/user/logout", (req, res, next) => {
        req.session.destroy(function (e) {
            if (e) {
                res.status(500).json({
                    status: 500,
                    message: "internal error"
                });
            } else {
                // session détruite
                res.status(200).json({
                    status: 200,
                    message: "user successfully logged out"
                });
            }
        });
    });

    // --------------- DELETE USER --------------
    router.delete('/user/:user_id', async (req, res) => {
        const numRemoved = await users.delete(req.params.user_id);
        try {
            if (numRemoved > 0) {
                res.status(200).json({
                    status: 200,
                    message: "user deleted"
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: "unknown user"
                });
            }
        }
        catch (e) {
            res.status(500).json({
                status: 500,
                message: "internal error"
            });
        }
    });

    // --------------- UPDATE USER DATA --------------
    router.put('/user/:user_id', async (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        const numUpdated = await users.updateData(req.params.user_id, login, password, lastname, firstname);
        try {
            if (numUpdated > 0) {
                res.status(200).json({
                    status: 200,
                    message: "user data updated"
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: "unknown user"
                });
            }
        } catch (e) {
            res.status(500).json({
                status: 500,
                message: "internal error"
            });
        }
    });

    /* ********************************************************************** */
    /* ****************************** MESSAGES ****************************** */
    /* ********************************************************************** */

    // requêtes sur les messages (messages.js)
    const messages = new Messages.default(db);

    /* --------------- CREATE MESSAGE -------------- */
    
    router.put("/message", (req, res) => {
        const { user_id, content } = req.body;

        if (!content || !user_id) {
            res.status(400).json({
                status : 400,
                message : "missing fields"
            });
        } else {
            messages.create(user_id, content)
                .then((message_id) => res.status(201).json({
                    status : 201,
                    message : "message created",
                    id : message_id
                }))
                .catch((e) => res.status(500).json({
                    status : 500,
                    message : "internal error"
                }));
        }
    });

    /* --------------- GET MESSAGE -------------- */

    router.get("/message/:message_id", async (req, res) => {
        try {
            const message = await messages.getData(req.params.message_id);
            if (!message) {
                res.status(404).json({
                    status: 404,
                    message: "message does not exist"
                });
            } else {
                res.send(message);
            }
        }
        catch (e) {
            res.status(500).json({
                status: 500,
                message: "internal error"
            });
        }
    })

    // --------------- DELETE MESSAGE --------------
    router.delete('/message/:message_id', async (req, res) => {
        const numRemoved = await messages.delete(req.params.message_id);
        try {
            if (numRemoved > 0) {
                res.status(200).json({
                    status: 200,
                    message: "message deleted"
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: "message does not exist"
                });
            }
        }
        catch (e) {
            res.status(500).json({
                status: 500,
                message: "internal error"
            });
        }
    });

    // --------------- UPDATE MESSAGE --------------
    router.patch('/message/:message_id', async (req, res) => {
        const numUpdated = await messages.updateContent(req.params.message_id, req.body.content);
        try {
            if (numUpdated > 0) {
                res.status(200).json({
                    status: 200,
                    message: "message updated"
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: "message does not exist"
                });
            }
        } catch (e) {
            res.status(500).json({
                status: 500,
                message: "internal error"
            });
        }
    });

    // --------------- GET USER MESSAGES --------------
    router.get('/user/:user_id/messages', async (req, res) => {
        const messageList = await messages.getUserMessages(req.params.user_id);

        try {
            if (await users.getData(req.params.user_id)) {
                res.status(200).json({
                    status: 200,
                    messages: messageList
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: "user does not exist"
                });
            }
        } catch (e) {
            res.status(500).json({
                status: 500,
                message: "internal error"
            });
        }
    });
	
    /* ********************************************************************** */
    /* *************************** Friends ********************************** */
    /* ********************************************************************** */

    // requêtes sur les amis (friends.js)
    const friends = new Friends.default(db);

    // --------------- ADD A FRIENDSHIP BETWEEN 2 USERS  --------------
	
    // --------------- GET ALL FRIENDS OF USER   --------------

    // --------------- CHECK FRIENDSHIP BETWEEN 2 USERS   --------------

    // --------------- DELETE FRIENDSHIP --------------
	
	
	
	
    return router;
}

exports.default = init;
