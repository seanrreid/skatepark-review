const db = require('./conn.js');

class Park {
    constructor(id, name, address, picture){
        this.id = id;
        this.name = name;
        this.address = address;
        this.picture = picture;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from parks;`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getById(p_id) {
        try {
            const response = await db.one(`select * from parks where id = ${p_id}`);
            // We're returning a single instance of the Park...
            // I didn't have it this way initially, TDD helped fix this issue
            const parkInstance = new Park(response.id, response.name, response.address, response.picture);
            return parkInstance;
        } catch(err) {
            return err.message;
        }
    }

    static async getParkReviews(p_id) {
        try {
            const response = await db.any(`select * from reviews where park_id = ${p_id}`);
            return response;
        } catch(err) {
            return err.message;
        }
    }
}

module.exports = Park;