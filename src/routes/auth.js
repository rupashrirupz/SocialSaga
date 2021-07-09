const express = require("express");
const router = express.Router();
const userService = require('../services/user');

router.post("/register",(req,res,next)=>{
    return userService.register(req.body).then(registeredUser => {
        res.status(200).json(registeredUser);
    }).catch(err => {
        next(err);
    })
   
})
router.post("/login",(req,res,next)=>{
    return userService.login(req.body).then(authenticatedUser => {
        res.status(200).json(authenticatedUser);
    }).catch(err => {
        next(err);
    })
   
})
module.exports = router;