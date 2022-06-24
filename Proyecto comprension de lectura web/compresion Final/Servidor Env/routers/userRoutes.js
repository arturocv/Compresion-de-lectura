const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers');
const auth = require('../middleware/autenticacion');


router.put("/api/addUsers", userControllers.addUser);
router.post("/api/login", userControllers.login);
router.get("/api/login", auth, userControllers.autenticacionUser);


module.exports = router;