const sqlite3 = require("sqlite3");
const {createDatabase} = require("./create-database");

class Analytics {
    constructor() {
        this.db = new sqlite3.Database('src/db/analytics.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err && err.code === "SQLITE_CANTOPEN") {
                console.log(err)
                createDatabase();
            } else if (err) {
                console.log("Getting error " + err);
            }
        });
    }

    getUserById(userId, callback) {
        this.db.get(`
            select * from users
            where user_id=$userId;
        `, {$userId: userId}, callback)
    }

    addUser(user, callback) {
        this.getUserById(user.id, (err, raws) => {
            console.log('err', err, 'res', raws)

            if (!raws && !err) {
                this.db.run(`
                insert into users (user_id, user_name) 
                values ($userId, $userName);`, {
                    $userId: user.id,
                    $userName: user.username
                }, callback)
            }
        })
    }

    async getUsers(callback) {
        this.db.all(`
            select * from users;
        `, callback)
    }


}

module.exports = {Analytics};