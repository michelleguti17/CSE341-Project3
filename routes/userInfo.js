const express = require('express');
const router = express.Router();

const userInfoController = require("../controllers/userInfo");

router.get('/', userInfoController.getAll);

router.get('/:id', userInfoController.getSingle);

router.post('/', userInfoController.createUser);

router.put('/:id', userInfoController.updateUser); 

router.delete('/:id', userInfoController.deleteUser);

module.exports = router;