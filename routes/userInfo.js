const express = require('express');
const router = express.Router();

const userInfoController = require("../controllers/userInfo");
const validation = require('../middleware/validate');
router.get('/', userInfoController.getAll);

router.get('/:id', userInfoController.getSingle);

router.post('/', validation.saveUser, userInfoController.createUser);

router.put('/:id', validation.saveUser, userInfoController.updateUser); 

router.delete('/:id', userInfoController.deleteUser);

module.exports = router;