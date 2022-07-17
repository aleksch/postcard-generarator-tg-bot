const sqlite3 = require("sqlite3");
const {createTables} = require('./create-tables')

function createDatabase() {
    const newdb = new sqlite3.Database('src/db/analytics.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            return;
        }
        createTables(newdb);
    });
}

module.exports = {createDatabase};