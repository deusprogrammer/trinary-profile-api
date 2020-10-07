import userController from '../controllers/userController'
import express from 'express'

var router = express.Router()

router.route("/")
    .get(userController.getUsers)
    .post(userController.createUser)

router.route("/:id")
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

export default router