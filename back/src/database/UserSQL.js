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

module.exports = {saveUser:saveUser};