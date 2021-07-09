const express = require("express");
const router = express.Router();
const UserService = require("../services/user")

router.put("/:id", (req,res,next)=>{

   return UserService.update(req.body, req.params.id).then(updatedUser => {
       res.status(200).json(updatedUser);
   }).catch(err=>{
       next(err);
   })
})

router.delete("/:id",(req,res,next)=>{
    return userService.delete(req.params.id).then((isDeleted)=>{
        if(isDeleted){
            res.status(200).json({msg:"user deleted"});
        }
    }).catch(err=>{
        next(err);
    })
})

router.get("/:id",(req,res,next)=>{
    return userService.get(req.params.id).then((data)=>{
        if(data){
            res.status(200).json(data);
        }
    }).catch(err=>{
        next(err);
    })
})

router.put("/:id/follow", (req, res,next) => {
    return userService.follow(req.params.id, req.body.id).then( (data) =>{
        res.status(200).json(data.msg)
    }).catch(err=>{
        nect(err);
    })
})
router.put("/:id/unfollow", (req, res,next) => {
    return userService.unfollow(req.params.id, req.body.id).then( (data) =>{
        res.status(200).json(data.msg)
    }).catch(err=>{
        nect(err);
    })
})

module.exports = router;