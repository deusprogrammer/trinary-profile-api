import Users from '../models/user'

export default {
    getUsers: (req, res) => {
        Users.find({}, (error, results) => {
            if (error) {
                res.send(error)
                res.status(400)
                return
            } 

            res.json(results)
        })
    },
    getUser: (req, res) => {
        Users.findById(req.params.id, (error, result) => {
            if (error) {
                res.status(400)
                res.send(error)
                return
            }

            if (result === null) {
                res.status(404)
                res.send("User not found")
                return
            }

            res.json(result)
        })
    },
    createUser: (req, res) => {
        if (req.user.roles.length <= 0) {
            res.status(403);
            res.send("Insufficient privileges");
            return;
        }

        if (!req.user.roles.includes("TWITCH_BOT") || !req.user.roles.includes("SUPER_USER")) {
            req.body.connected = null;
        }

        if (!req.user.roles.includes("SUPER_USER")) {
            req.body.roles = [];
        }

        Users.create(req.body, (error, result) => {
            if (error) {
                res.status(400)
                res.send(error)
                return
            }

            res.json(result)
        })
    },
    updateUser: (req, res) => {
        // If user is not owner
        if (req.user._id != req.params.id || req.user.roles.includes("SUPER_USER")) {
            res.status(403);
            res.send(error);
            return;
        }

        Users.findOneAndUpdate({_id: req.params.id}, req.body, (error, result) => {
            if (error) {
                res.status(400)
                res.send(error)
                return
            }

            if (result === null) {
                res.status(404)
                res.send("User not found")
                return
            }

            res.json(result)
        })
    },
    deleteUser: (req, res) => {
        // If user is not owner
        if (req.user._id != req.params.id || req.user.roles.includes("SUPER_USER")) {
            res.status(403);
            res.send(error);
            return;
        }

        Users.remove({_id: req.params.id}, (error, result) => {
            if (error) {
                res.status(400)
                res.send(error)
                return
            }

            if (result === null) {
                res.status(404)
                res.send("User not found")
                return
            }

            res.json(result)
        })
    }
}
