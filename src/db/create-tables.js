
function createTables(newdb) {
    newdb.exec(`
        create table users (
            user_id int primary key not null,
            user_name text not null
        );
    `);
}

module.exports = {
    createTables
}