const pg = require('pg');

const dotenv = require('dotenv');
const env = dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const pool = new pg.Pool({
    user: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    ssl: true
  })

module.exports={pool:pool}