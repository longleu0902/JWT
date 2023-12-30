// get the client
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';


import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    const hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    await db.User.create({
        username: username,
        email:email,
        password:hashPassword
    })
    // // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     // const [rows, fields] = await connection.execute('INSERT INTO user(email, password, username) VALUES(?, ?, ?)', [email, hashPassword, username]);
      
    // } catch (err) {
    //     console.log(err)
    // }
}
const getUserList = async () => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        // const [rows, fields] = await connection.execute('SELECT * FROM user');
        // return rows;
        let users = [];
        users = await db.User.findAll();
        return users;

    } catch (err) {
        console.log(err)
    }

}
const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id:userId }
      });
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     // const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?',[id]);
    //     // return rows;
      
    // } catch (err) {
    //     console.log(err)
    // }
  
}
const getUserById = async (id) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('select * FROM user WHERE id=?',[id]);
    //     return rows;
    // } catch (err) {
    //     console.log(err)
    // }
    let user= {};
    user = await db.User.findOne({
        where: {id : id}
    })
    return user.get({ plain: true});
    // console.log(">>>check user by id",user)

}
const updateUserInfo = async(email,username,id) =>{
    
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id=?',[email,username,id]);
    //     return rows;
    // } catch (err) {
    //     console.log(err)
    // }

    await db.User.update({ email: email, username:username  }, {
        where: {
          id: id
        }
      });


}
module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfo,
}