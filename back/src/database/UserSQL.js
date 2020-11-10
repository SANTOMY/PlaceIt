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

module.exports = {saveUser:saveUser};