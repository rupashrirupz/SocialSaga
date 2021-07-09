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
    }
    const validPassword = await bcrypt.compare(userData.password,retrievedUser.password);
    authenticatedUser.validPassword = validPassword;
    return authenticatedUser;
}



user.getNumberOfUsers = () => {

    collection.find().then(data => {
        return data.length
    })

}

module.exports = user;