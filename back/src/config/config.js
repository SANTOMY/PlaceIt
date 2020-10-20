var pg = require('pg');

const dotenv = require('dotenv');
const env = dotenv.config();

const { Client } = require('pg')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const client = new Client ({
    database: env.parsed.DB,
    user: env.parsed.USER, //ユーザー名はデフォルト以外を利用している人は適宜変更してください。
    password: env.parsed.PASSWORD, //PASSWORDにはPostgreSQLをインストールした際に設定したパスワードを記述。
    host: env.parsed.HOST,
    port: 5432,
    ssl: true
  });

exports.connect() = function(query) {
    client.connect()
    .then(() => console.log("Connected successfuly"))
    .then(() => client.query(query))
    .then(results => console.table(results.rows))
    .catch((e => console.log(e)))
    .finally((() => client.end()))
};
