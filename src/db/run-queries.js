function runQueries(db) {
    db.all(`
    select hero_name, is_xman, was_snapped from hero h
    inner join hero_power hp on h.hero_id = hp.hero_id
    where hero_power = ?`, "Total Nerd", (err, rows) => {
        rows.forEach(row => {
            console.log(row.hero_name + "\t" +
                row.is_xman + "\t" +
                row.was_snapped);
        });
    });
}

module.exports = {
    runQueries
}