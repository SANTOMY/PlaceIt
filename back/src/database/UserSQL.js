'use strict';
const con = require('./DBHandler.js');
const {info, debug, warning, error}  = require('../winston');
const { connect } = require('../route/userRoute.js');
const pool = con.pool;
const fileLabel = "UserSQL"
const User = require('../objects/user');
const util = require('util');


/**
 * Add user data to the database
 */
async function saveUser(newUser) {
    const query = {
        text: 'INSERT INTO users.users(id, username, email, password) VALUES($1, $2, $3, $4)',
        values: [newUser.userId, newUser.userName, newUser.email, newUser.password]
    };
    const client = await pool.connect();
    //await client.query(query);
    return client.query(query).then(() =>{
        client.release();
        info(fileLabel,"saved user: " + util.inspect(newUser,{showHidden: false, depth: null}));
        return {"success":true,"data":newUser};
    }).catch(err=>{
        client.release();
        info(fileLabel,"ERROR OBJECT:" + util.inspect(err,{showHidden: false, depth: null}));
        error(fileLabel,"Error while saving user. " + err);
        return {"success":false,"data":err}; 
    })
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

async function editUser(currentEmail, newEmail, newPassword, newUserName) {
    var setQuery = "";
    var emailStatus = "not updated";
    var passwordStatus = "not updated";
    var usernameStatus = "not updated";
    if (newEmail && typeof newEmail !== 'undefined') {
        setQuery = setQuery + ` email='${newEmail}',`
        emailStatus = `updated to ${newEmail}`
    }
    if (newPassword && typeof newPassword !== 'undefined') {
        setQuery = setQuery + ` password='${newPassword}',`
        passwordStatus = `updated to ${newPassword}`
    }
    if (newUserName && typeof newUserName !== 'undefined') {
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

module.exports = {saveUser:saveUser, getUserByEmail:getUserByEmail, editUser:editUser};