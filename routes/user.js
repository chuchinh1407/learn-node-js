const express = require('express');

// const router=express.Router();

const router = require('express-promise-router')();//dung cai nay thi khong can try catch trong ham controller nua

const UserController = require('../controllers/user');

router.route('/')
    .get(UserController.index)
    .post(UserController.newUser)
// .put()
// .delete()
router.route('/:userID')
.get(UserController.getUser)
.put(UserController.replaceUser)
.patch(UserController.updateUser)



module.exports = router;