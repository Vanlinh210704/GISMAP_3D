var pg = require("pg");

var config = {
    user: 'postgres',
    database: 'GISMAP_3D',
    password: '1234',
    host: 'localhost',
    port: '5432',
};

var pool = new pg.Pool(config);

module.exports = { pool };