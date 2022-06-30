const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersControllers');
const { check} = require('express-validator');
const auth = require('../middleware/auth');


router.post('/api/addUser', 
    [
        check('nombres', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('institucion', 'Debes agragar tu Institución ').not().isEmpty(),
        check('pin', 'Debes agragar un pin').not().isEmpty(),
        check('password', 'La contraseña debe ser minimo de 8 caracteres').isLength({ min: 8})
    ],
    userControllers.addUsers
);

router.post('/api/login', userControllers.loginUser);
router.get('/api/login', auth, userControllers.userAuth);
module.exports = router;