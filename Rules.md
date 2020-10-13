_SANTOMY_
---

# git 
- branchの構造
  - master
    - リリースバージョン
    - 基本的に変更しない
  - develop  
    - 開発の最新の状態を維持するbranch
  - feature/(taskの役割)
    - 作業ブランチ

- 開発の進め方
  - 'git clone'でリポジトリをクローンする or リポジトリをクローンしている場合はdevelopブランチで'git pull'をする
  - developから'git branch \[ブランチ名\]'を実行してブランチを作成する
  - 'git checkout \[ブランチ名\]'を実行して開発branchに移動する
  - 開発する
  - コミットするときは'git commit -m "#(issue number) メッセージ" '
  - 開発が完了したら、'git push \[ブランチ名\]'でリモートにpush
  - githubでpull requestを作成する(reviewerを指定する。conflictは解消する)
  - レビューを揃える
  - developブランチにマージする
  
# レビュー
- pull requestを作るときは必ずreviewerを指定する(チーム内で均等にする)
  - frontはassignerから見て交互
  - back
- 必ず1人以上のレビューをもらう
- レビュー観点(descriptionに書く)
  - テストの手順(テストのコマンドと実行結果を示す)
  - そのほかに見て欲しいところ(コメントが理解できるか、作成した機能の使い方が理解できるかなど)
  - コミットメッセージが適切か

# タスクボード
- スプリントの初めに取り組むタスクを'Back Log'から'To Do'に移す(スプリント開始時のミーティングで)
- タスクに人をassignする(スプリント開始時のミーティングで)
- タスクに取り組む人はタスクの作業ブランチを作成してすぐにタスクボードからタスクを'In Progress'に移す
- reviewerがpull requestをマージしたら、タスクボードのタスクをDoneに移す

# スプリントの流れ
- スプリント開始時にタスク割り当てのミーティング(30min-1hour)
- 次の授業の終わりに中間報告回(weekly scrum)(15min)
- スプリントの終わりの授業で振り返り(30min-1hour)


