const {Client} = require('pg');

const client = new Client({
  host: "db",
  database: "user",
  user: "user",
  port: 5432,
  password: "password"
});

exports.connect = function(query) {
    client.connect()
    // 接続を確認
    .then(() => console.log("Connected successfuly"))
    // users テーブルから取得
    .then(() => client.query(query))
    // 結果を返す
    .then(results => console.table(results.rows))
    // エラーの場合
    .catch((e => console.log(e)))
    // 終了
    .finally((() => client.end()))
};