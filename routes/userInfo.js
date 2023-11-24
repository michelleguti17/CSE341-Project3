const express = require('express');
const router = express.Router();

const userInfoController = require("../controllers/userInfo");
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');
router.get('/', userInfoController.getAll);

router.get('/:id', userInfoController.getSingle);

router.post('/', isAuthenticated, validation.saveUser, userInfoController.createUser);

router.put('/:id', isAuthenticated, validation.saveUser, userInfoController.updateUser); 

router.delete('/:id', isAuthenticated, userInfoController.deleteUser);

module.exports = router;