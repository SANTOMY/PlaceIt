var express = require('express');
var router = express.Router();
var pg = require('pg');

router.get('/', function(req, res, next) {
  var pool = pg.Pool({
    database: 'd63cdmlbgnj93n',
    user: 'jbkfxlthkrasiq', //ユーザー名はデフォルト以外を利用している人は適宜変更してください。
    password: '141aaed2ed68e510aa278a4741e5d96b392190965a76cb98c85abab8dc5fefcf', //PASSWORDにはPostgreSQLをインストールした際に設定したパスワードを記述。
    host: 'ec2-3-218-112-22.compute-1.amazonaws.com',
    port: 5432,
  });
  pool.connect( function(err, client) {
    if (err) {
      console.log(err);
    } else {
      client.query('SELECT name FROM staff', function (err, result) {
        res.render('index', {
          title: 'Express',
          datas: result.rows[0].name,
        });
        console.log(result); //コンソール上での確認用なため、この1文は必須ではない。
      });
    }
  });
});

module.exports = router;

bash: export: `=': not a valid identifier
bash: export: `/usr/local/opt/openssl/bin:/Library/Java/JavaVirtualMachines/jdk-13.jdk/Contents/Home:/Users/shimizu/.pyenv/shims:/Users/shimizu/.pyenv/bin:/Users/shimizu/.nodebrew/current/bin:/usr/local/opt/openssl/bin:/Library/Java/JavaVirtualMachines/jdk-13.jdk/Contents/Home:/Users/shimizu/.pyenv/shims:/Users/shimizu/.pyenv/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/TeX/texbin:/Users/shimizu/bin:/usr/local/opt/openssl/bin:/Library/Java/JavaVirtualMachines/jdk-13.jdk/Contents/Home:/Users/shimizu/.pyenv/shims:/Users/shimizu/.pyenv/bin:/Users/shimizu/READMEClassifier-master/:/Users/shimizu/sqlite-tools-osx-x86-3290000/:/Users/shimizu/RefactoringMiner/build/distributions/RefactoringMiner-1.0/bin/:/Users/shimizu/READMEClassifier-master/:/Users/shimizu/sqlite-tools-osx-x86-3290000/:/Users/shimizu/RefactoringMiner/build/distributions/RefactoringMiner-1.0/bin/:/Users/shimizu/READMEClassifier-master/:/Users/shimizu/sqlite-tools-osx-x86-3290000/:/Users/shimizu/RefactoringMiner/build/distributions/RefactoringMiner-1.0/bin/:/Users/shimizu/.kube/config-RefactoringEffortAnalyzer': not a valid identifier