var express = require('express')
var router = express.Router()
const { check } = require('express-validator');
const { signup, signout, signin } = require("../controllers/auth")


router.post("/signup",[
    check("name").isLength({ min: 3 }).withMessage("Name should be at least 3 chars long"),
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 5 }).withMessage("Password should be at least 5 chars long")
] ,signup)

router.post("/signin",[
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 3 }).withMessage("Password is required")
] ,signin)

router.get("/signout", signout)



module.exports = router;