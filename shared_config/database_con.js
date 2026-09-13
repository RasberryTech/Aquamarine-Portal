const knex = require('knex');

const connection = {
    host: process.env.DB_HOST || process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || process.env.MYSQL_PORT || 3306),
    user: process.env.DB_USER || process.env.MYSQL_USER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '1234',
    database: process.env.DB_NAME || process.env.MYSQL_DATABASE || 'aquamarine'
};

const db = knex({
    client: 'mysql2',
    connection,
    pool: {
        min: 0,
        max: 10,
        afterCreate: (conn, done) => {
            conn.query(
                "SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))",
                err => done(err, conn)
            );
        }
    }
});

db.env_db = db;
db.account_db = db;

module.exports = db;