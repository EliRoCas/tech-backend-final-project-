const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Autenticar un usuario -- // api/auth

router.post(
    "/", [
    check("email", "Digite un correo válido").isEmail(),
    check("password", "La contraseña debe tener mínimo 8 caracteres").isLength({
        min: 8,
    }),
],
    authController.userAuthentication
);

router.get("/", auth, authController.authenticatedUser);

module.exports = router;