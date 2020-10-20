const {Client} = require('pg');

const client = new Client({
  host: "db",
  database: "user",
  user: "user",
  port: 5432,
  password: "password"
});
/*
pool.connect( function(err, client) {
    if (err) {
      console.log(err);
    } else {
        console.log("success"); //コンソール上での確認用なため、この1文は必須ではない。
    }
})
*/

/*
const query = {
    text: 'INSERT INTO users(id, username, email, password) VALUES($1, $2, $3, $4)',
    values: [4, 'shiro', 'ddd@com', 'pass3']
}
*/

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