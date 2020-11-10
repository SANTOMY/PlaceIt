const pg = require('pg');

const dotenv = require('dotenv');
const env = dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const pool = new pg.Pool({
    user: env.parsed.USER,
    host: env.parsed.HOST,
    database: env.parsed.DB,
    password: env.parsed.PASSWORD,
    port: 5432,
    ssl: true
  })

module.exports={pool:pool}