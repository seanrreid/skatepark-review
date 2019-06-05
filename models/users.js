const db = require('./conn.js'),
    bcrypt = require('bcryptjs');

class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    checkPassword(aPassword) {
        return bcrypt.compareSync(aPassword, this.password);
    }

    async save() {
        try {
            const response = await db.one(`
                insert into users 
                    (first_name, last_name, email, password) 
                values 
                    ($1, $2, $3, $4) 
                returning id
                `, [this.first_name, this.last_name, this.email, this.password]);
            console.log("user id is", response.id);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    async login() {
        const userData = await db.one(`select * from users where email = $1`, [this.email]);
        console.log("user data is", userData);
        const valid = this.checkPassword('password1234');
        console.log('is valid', valid);
    }
}

module.exports = User;