const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/userController");


// Se crea un usuario -- // api/user 

router.post(
    "/", [
    check("name", "El nombre debe ser obligatorio").not().isEmpty(),
    check("email", "Agregue un correo valido").isEmail(),
    check("password", "La contraseña debe tener mínimo 8 caracteres").isLength({
        min: 8,
    }),
],
    userController.userCreation
);

module.exports = router; 