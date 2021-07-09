const User = require('../utilities/connection');
const bcrypt = require("bcrypt");

const user = {};

user.register = async (userData) => {

    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    //create new user

    const newUser = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    });

    return newUser.save(userData).then(insertedUserData => {
        if (insertedUserData) {
            return insertedUserData;
        } else {
            return null;
        }
        // else {
        //     const err = new Error("Unable to register");
        //     err.status = 500;
        //     throw err;
        // }

    })

}

user.login = async (userData) => {
    const retrievedUser = await User.findOne({username : userData.username});
    let authenticatedUser = {validUser: false,validPassword: false ,user: retrievedUser};
    if(retrievedUser){
        authenticatedUser.validUser = true;
        const validPassword = await bcrypt.compare(userData.password,retrievedUser.password);
        authenticatedUser.validPassword = validPassword;
    }
    return authenticatedUser;
   
}

//update password
user.update = async (userData , id)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(userData.password, salt);
    updatedUser = await User.findOneAndUpdate({username : id} , {$set:{
        password : hashedPass
    }});
    if(updatedUser) {
        return updatedUser;
    } else {
        return null;
    }
}
//delete user 
user.delete = async (id)=>{
    deletedUser = await User.findByIdAndDelete(id);
    if(deletedUser) {
        return true;
    } else {
        return false;
    }
} 



//get an user 
user.get = async (id)=>{
    requestedUser = await User.findById(id);
    return requestedUser;
}

//follow an user
user.follow = async(followerId, UserDetails) =>{
    const responseObj = {isError : false, msg:'',status:400};
    const follower = await User.findById(followerId);
    const currentUser = await User.findById(UserDetails.id);
    if(follower && currentUser){
        if(!currentUser.followers.includes[followerId]){
            await currentUser.updateOne({$push : {followers: followerId}});
            await follower.updateOne({$push:{followers:UserDetails.id}});
            responseObj.isError = false;
            responseObj.status = 200
            responseObj.msg = "Follower Updated Successfully"
            
        } else {
            responseObj.isError = true;
            responseObj.status = 203
            responseObj.msg = "You are following this user already"
            
        }
    }else {
        responseObj.isError = true;
        responseObj.status = 404;
        responseObj.msg = "Invalid User or follower"
        
        
    }
    return responseObj;
}

//unfollow an user 
user.unfollow = async(followerId, UserDetails) =>{
    const responseObj = {isError : false, msg:''};
    const follower = await User.findById(followerId);
    const currentUser = await User.findById(UserDetails.id);
    if(follower && currentUser){
        if(currentUser.followers.includes[followerId]){
            await currentUser.updateOne({$pull : {followers: followerId}});
            await follower.updateOne({$pull:{followers:UserDetails.id}});
            responseObj.isError = false;
            responseObj.status = 200
            responseObj.msg = "Unfollowed Successfully"
            
        } else {
            responseObj.isError = true;
            responseObj.status = 203;
            responseObj.msg = "You are not following this user..."
            
        }
    }else {
        responseObj.isError = true;
        responseObj.status = 404;
        responseObj.msg = "Invalid User or follower"
        
        
    }
    return responseObj;
}

module.exports = user;