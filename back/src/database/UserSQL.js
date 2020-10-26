'use strict';

class UserSQL {
    constructor(id, name, mail, password) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.password = password;
    }

    /**
     * Add user data to the database
     */
    addToDatabase() {
        const conf = require('./DBHandler.js')
        const query = {
            text: 'INSERT INTO users.users(id, username, email, password) VALUES($1, $2, $3, $4)',
            values: [this.id, this.name, this.mail, this.password]
        }
        const queries = [query]
        conf.connect(queries)
    }
}

//new User(2, 'jiro', 'bbb@com', 'pass2').addToDatabase()