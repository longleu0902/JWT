// get the client
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});


import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    const hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('INSERT INTO users(email, password, username) VALUES(?, ?, ?)', [email, hashPassword, username]);
    } catch (err) {
        console.log(err)
    }
}
const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;

    } catch (err) {
        console.log(err)
    }

}
const deleteUser = async (id) => {
    // DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?',[id]);
        return rows;
    } catch (err) {
        console.log(err)
    }
  
}
module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
}