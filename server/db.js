const POOl = require("pg").Pool;
const Pool = new POOl({
    user:"playabook",
    host:"localhost",
    password:"8896",
    database:"wocky",
    port:5432
});

module.exports = Pool;


