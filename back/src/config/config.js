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

exports.connect = async function (queries) {
  try {
      await client.connect()
      console.log('Connected successfully in async')
      for (const query of queries) {
          console.log(query)
          await client.query(query)
      }
      client.end()
      console.log("Client disconnected successfully")
  } catch (ex) {
      console.log(`Something wrong happend ${ex}`)
  } finally {
      await client.end()
      console.log('Client disconnected successfully')
  }
}