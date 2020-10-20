'use strict';

class User {
    constructor(id, name, mail, password) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.password = password;
    }

    addToDatabase() {
        //const conf = require('../conf/conifg.js')
        const conf = require('../sql/connect_database.js')
        const query = {
            text: 'INSERT INTO users(id, username, email, password) VALUES($1, $2, $3, $4)',
            values: [this.id, this.name, this.mail, this.password]
        }
        conf.connect(query)
    }
}

new User(5, 'goro', 'eee@com', 'pass4').addToDatabase()