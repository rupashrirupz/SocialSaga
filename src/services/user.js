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

module.exports = userService;