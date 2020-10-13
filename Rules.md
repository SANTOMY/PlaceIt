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
- pull requestを作るときは必ずreviewerを指定する
- 必ず1人以上のレビューをもらう
- レビュー観点(descriptionに書く)
  - 
  
