const fs = require("fs");

module.exports = function () {
    module.db = require("./libs/json/db.json");

    module.set = async function set(table, row, column) {
        return new Promise((resolve, reject) => {
            if (!table || !row || !column) throw Error("No table/row/column specified!");
            if (!module.db[table]) return resolve(undefined);
            if (table === 'uid' && !column.type) throw Error("no type specified.")
            module.db[table][row] = column;

            module.save();
            return resolve(true)
        });
    };

    module.delete = async function _delete(table, row) {
        return new Promise((resolve, reject) => {
            if (!table || !row) throw Error("No table/row specified!");
            if (!module.db[table]) return resolve(undefined);
            delete (module.db[table][row]);

            module.save();
            return resolve(true)
        });
    };

    module.find = async function find(table, column, value) {
        return new Promise((resolve, reject) => {
            if (!table || !column || !value) throw Error("No table/column/value specified!");
            if (!module.db[table]) return resolve(undefined);

            let row = Object.keys(module.db[table]).find(row => module.db[table][row][column] === value);
            if (!row) return resolve(undefined);

            module.save();
            return resolve(Object.assign( module.db[table][row], {uid: row}));
        });
    };

    module.get = async function get(table, row) {
        return new Promise((resolve, reject) => {
            if (!table || !row) throw Error("No table/row specified!");
            if (!module.db[table][row]) return resolve(undefined);

            module.save();
            return resolve(module.db[table][row]);
        });

    };

    module.save = function save() {
        fs.writeFileSync("./libs/json/db.json", JSON.stringify(module.db, null, 2));
    }

    var autoSave = setInterval(module.save, 5 * 60 * 1000);

    process.once('beforeExit', module.save);
    process.once('exit', module.save);
    process.once('SIGINT', module.save);
    process.once('uncaughtException', module.save);
    process.once('SIGINT', module.save);
    process.once('SIGTERM', module.save);

    return module;
};