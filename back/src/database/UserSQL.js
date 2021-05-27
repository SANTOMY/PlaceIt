'use strict';
const con = require('./DBHandler.js');
const {info, debug, warning, error}  = require('../winston');
const pool = con.pool;
const fileLabel = "UserSQL"
const util = require('util');
const bcrypt = require('bcryptjs');
const utility = require('../utility');
const { exception } = require('console');


/**
 * Add user data to the database
 */
async function saveUser(newUser) {
    const query = {
        text: 'INSERT INTO users.users(id, username, email, password, university, is_active) VALUES($1, $2, $3, $4, $5, $6)',
        values: [newUser.userId, newUser.userName, newUser.email, newUser.password, newUser.university, true]
    };

    const client = await pool.connect();
    return getUserByEmail(newUser.email).then((result)=>{
        //Check user doesn't exist
        if (result.success){
            error(fileLabel,"Error: This email is already in use ");
            return {"success":false,"data": "This email is already in use"}; 
        } else{
            return client.query(query).then(() =>{
                client.release();
                info(fileLabel,"saved user: " + util.inspect(newUser,{showHidden: false, depth: null}));
                return {"success":true,"data":newUser};
            }).catch(err=>{
                client.release();
                error(fileLabel,"ERROR OBJECT:" + util.inspect(err,{showHidden: false, depth: null}));
                error(fileLabel,"Error while saving user. " + err);
                return {"success":false,"data":err}; 
            })
        }
    });
}

async function getUserByEmail(email) {
    const query = {
        text: `SELECT * FROM users.users WHERE email='${email}'`
    };
    const client = await pool.connect();
    return client.query(query).then( result => {
       client.release();
        if (result.rowCount == 0)
            return {"success":false, "data":"User does not exist"};
        info(fileLabel,"get user by email: " + email);
        return {"success":true, "data":result.rows};
    }).catch((exception)=>{
        client.release();
        error(fileLabel,"Error while getting user. " + exception);
        return {"success":false, "data":exception};      
    });
}

async function getUserById(userId){
    const query = {
        text:`SELECT * FROM users.users WHERE id='${userId}'`
    };
    const client = await pool.connect();
    return client.query(query).then( result =>{
        client.release();
        if (result.rowCount == 0){
            return {"success":false, "data":"User does not exist"};
        }
        info(fileLabel,"Fetching user with id: " + userId);
        return {"success":true, "data":result.rows};
    }).catch((exception) => {
        client.release();
        error(fileLabel,"Error while getting user with id: " + userId);
        error(fileLabel,exception);
        return {"success":false, "data":exception};
    });
}

async function editUser(currentEmail, newEmail, newPassword, newUserName) {
    var setQuery = "";
    var emailStatus = "not updated";
    var passwordStatus = "not updated";
    var usernameStatus = "not updated";
    if (!utility.isEmpty(newEmail)) {
        setQuery = setQuery + ` email='${newEmail}',`
        emailStatus = `updated to ${newEmail}`
    }
    if (!utility.isEmpty(newPassword)) {
        setQuery = setQuery + ` password='${newPassword}',`
        passwordStatus = `updated to ${newPassword}`
    }
    if (!utility.isEmpty(newUserName)) {
        setQuery = setQuery + ` username='${newUserName}',`
        usernameStatus = `updated to ${newUserName}`
    }
    if (!setQuery) {
        return {"success":false, "data":"no changes"};
    }
    setQuery = setQuery.slice(0, -1)

    const query = {
        text: `UPDATE users.users SET ${setQuery} WHERE email='${currentEmail}'`
    };
    const client = await pool.connect();
    return client.query(query).then( result => {
        client.release();
        if (result.rowCount == 0)
            return {"success":false, "data":"User does not exist"};
        info(fileLabel,"edit user: " + currentEmail);
        return {"success":true, "email":emailStatus, "password":passwordStatus, "username":usernameStatus};
    }).catch((exception)=>{
        client.release();
        error(fileLabel,"Error while editing information. " + exception);
        return {"success":false, "data":exception};      
    });
}

async function confirmPassword(userId, password){
    const confirmQuery = {
        text: `SELECT * from users.users WHERE id='${userId}'`
    }
    const client = await pool.connect();
    return client.query(confirmQuery).then( result => {
        client.release();
        if (result.rowCount == 0){
            throw "User does not exist";
        }
        const hash = result.rows[0].password;
        const isCorrectPassword = bcrypt.compareSync(password, hash);
        if(!isCorrectPassword){
            return {"success":true, "data":"Passwrod is incorrect", "userId":userId, "confirm":false};
        }else{
            return {"success":true, "data":"Password is correct", "userId":userId, "confirm":true};
        }
    }).catch((exception)=>{
        client.release();
        error(fileLabel,"Error while confirming password. " + exception);
        return {"success":false, "data":exception};
    })
}

async function deleteUser(userId) {
    const deleteQuery = {
        text: `UPDATE users.users SET is_active=false WHERE id='${userId}'`
    };
    const client = await pool.connect();
    return client.query(deleteQuery).then( result => {
        client.release();
        return {"success":true, "data":"Successfully deleted", "userId":userId};
    }).catch((exception)=>{
        client.release();
        error(fileLabel,"Error while deleting user. " + exception);
        return {"success":false, "data":exception};
    });
}

async function login(email, password) {
    const query = {
        text: `SELECT * FROM users.users WHERE email='${email}'`
    };
    const client = await pool.connect();
    return client.query(query).then( result => {
        client.release();
        if (result.rowCount == 0)
            return {"success":false, "data":"User does not exist"};
        const hash = result.rows[0].password;
        const isCorrectPassword = bcrypt.compareSync(password, hash);
        info(fileLabel,"authentication by email: " + email);
        if (isCorrectPassword) {
            return {"success":true, "data":"Password is correct", "email":result.rows[0].email, "id":result.rows[0].id, "username":result.rows[0].username, "password":result.rows[0].password, "university":result.rows[0].university};
        } else {
            return {"success":false, "data":"Password is incorrect"};
        }
    }).catch((exception)=>{
        client.release();
        error(fileLabel,"Error while log in. " + exception);
        return {"success":false, "data":exception};      
    });
}

async function getAllUniversities() {
    const query = {
        text: `SELECT DISTINCT university FROM users.users WHERE university IS NOT NULL`
    };
    const client = await pool.connect();
    return client.query(query).then( result => {
        client.release();
        if (result.rowCount == 0)
            return {"success":false, "data":"University is not exist"};
        return {"success":true, "data":result.rows};
    }).catch((exception)=>{
        client.release();
        error(fileLabel,"Error while get universities. " + exception);
        return {"success":false, "data":exception};      
    });
}

module.exports = {saveUser:saveUser, getUserByEmail:getUserByEmail, editUser:editUser, confirmPassword:confirmPassword, deleteUser:deleteUser,
     login:login, getUserById:getUserById, getAllUniversities:getAllUniversities};