const { required } = require('@hapi/joi');
const express = require('express');

// const router=express.Router();

const router = require('express-promise-router')();//dung cai nay thi khong can try catch trong ham controller nua

const UserController = require('../controllers/user');

const {validateBody, validateParam,schemas}=require('../helpers/routerHelper');

router.route('/')
    .get(UserController.index)
    .post(validateBody(schemas.userSchema), UserController.newUser)
// .put()
// .delete()
router.route('/:userID')
    .get(validateParam(schemas.idSchema,'userID'), UserController.getUser)
    .put(UserController.replaceUser)
    .patch(UserController.updateUser)

router.route('/:userID/decks')
    .get(UserController.getUserDecks)
    .post(UserController.newUserDeck)



module.exports = router;