import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: {email : userEmail}
    })
    if(user){
        return true;
    }
    return false;
    

}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: {phone : userPhone}
    })

    if(user){
        return true;
    }
    return false;
    

}
const hashUserPassword = (userPassword) => {
    const hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const registerNewUser = async (rawUserData) => {
    try{
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if(isEmailExist === true){
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if(isPhoneExist === true){
            return{
                EM: 'The phone number is already exist',
                EC: 1
            } 
        }
        //hash password
        let hashPassword  = hashUserPassword(rawUserData.password)
        await db.User.create({
            email: rawUserData.email,
            username:rawUserData.username,
            phone: rawUserData.phone,
            password:hashPassword,
           
        })
        return{
            EM: 'A user is created successfully',
            EC: 0
        } 
    }catch(err){
        console.log(err)
        return {
            EM: 'Something wrongs in service....',
            EC: -2
        }
    }
}
module.exports = {
    registerNewUser,
}
