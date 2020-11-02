'use strict';
const con = require('./DBHandler.js');
const {info, debug, warning, error}  = require('../winston');
const { connect } = require('../route/userRoute.js');
const connection = con.connection;
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
    return connection.connect().then(()=>{
        //Need to add check if email/username already exists in database
        return connection.query(query).then(()=>{
            connection.end();
            info(fileLabel,"saved user: " + util.inspect(newUser,{showHidden: false, depth: null}));
            return {"success":true,"data":newUser};
        }).catch((exception)=>{
            connection.end();
            error(fileLabel,"Error while saving user. " + exception);
            return {"success":false,"data":exception};      
        });
    }).catch((exception)=>{
        connection.end();
        error(fileLabel,"Error trying to connect to database: " + exception);
        return {"success":false,"data":exception};
    });
}

async function roadUserByEmail(email) {
    const query = {
        text: `SELECT * FROM users.users WHERE email='${email}'`
    };
    return connection.connect().then(()=>{
        return connection.query(query).then( result => {
            connection.end();
            info(fileLabel,"road user by email: " + util.inspect(email,{showHidden: false, depth: null}));
            return {"success":true, "data":result.rows};
        }).catch((exception)=>{
            connection.end();
            error(fileLabel,"Error while roading user. " + exception);
            return {"success":false, "data":exception};      
        });
    }).catch((exception)=>{
        connection.end();
        error(fileLabel,"Error trying to connect to database: " + exception);
        return {"success":false, "data":exception};
    });
}

module.exports = {saveUser:saveUser};
module.exports = {roadUserByEmail:roadUserByEmail};