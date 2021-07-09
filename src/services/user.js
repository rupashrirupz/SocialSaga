const dbLayer = require('../models/user');

userService = {};

userService.generateId = ()=>{
    return dbLayer.getNumberOfUsers().then(nou=>{
        const seed = 1000;
        const unumber = seed + Number(nou) + 1;
        const userId = "U"+unumber;
        return userId;
    })
}

userService.register = (userData)=>{
    return dbLayer.register(userData).then((registerdUser)=>{
        if(registerdUser){
            return registerdUser;
        } else {
            let err = new Error("Registration Failed");
            err.status = 500;
            throw err;
        }
        

    });
}

userService.login = (userData)=> {
    return dbLayer.login(userData).then((retrievedUser)=>{
        if(retrievedUser.validUser && retrievedUser.validPassword){
            return retrievedUser.user
        } else if(!retrievedUser.validUser){
            let err = new Error("Invalid User");
            err.status = 404;
            throw err; 
            
        }else if(!retrievedUser.validPassword){
            let err = new Error("Invalid Password");
            err.status = 401;
            throw err; 
            
        }
    })
}

userService.update = (userData, id)=>{
   if(userData.username == id || userData.isAdmin) {
     return dbLayer.update(userData, id).then(upDatedUser=>{
         if(upDatedUser){
             return upDatedUser;
         } else {
             const err = new Error("Error Updating User details");
             err.status = 500;
             throw err;
         }
     })
   } else {
        const err = new Error("Error Updating User details");
        err.status = 401;
        throw err;
   }
}

userService.delete = (id)=>{
    return dbLayer.delete(id).then(isDeleted =>{
        if(isDeleted){
            return true;
        } else {
            const err = new Error("Error deleting User ");
            err.status = 500;
            throw err; 
        }
    })
}


userService.get= (id)=>{
   return dbLayer.get(id).then(requestedUser=>{
       if(requestedUser) {
           return requestedUser;
       } else {
           const err = new Error("User not found");
           err.status=404;
           throw err;
       }
   })
}

userService.follow = (fid, userDetails) =>{
    return dbLayer.follow(fid,userDetails).then(retrievedData =>{
        if(!retrievedData.error){
            return retrievedData.msg;
        } else {
            const err = new Error(retrievedData.msg);
            err.status = retrievedData.status;
            throw err;
        }
    })
}

userService.unfollow = (fid, userDetails) =>{
    return dbLayer.unfollow(fid,userDetails).then(retrievedData =>{
        if(!retrievedData.error){
            return retrievedData.msg;
        } else {
            const err = new Error(retrievedData.msg);
            err.status = retrievedData.status;
            throw err;
        }
    })
}
module.exports = userService;