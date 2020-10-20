-- 拡張をインストール
CREATE EXTENSION IF NOT EXISTS postgis;

-- テーブル削除
DROP TABLE IF EXISTS user_table;

-- テーブル作成
CREATE TABLE IF NOT EXISTS user_table
(
    id          INTEGER PRIMARY KEY,
    name        VARCHAR(20) NOT NULL,
    mail        VARCHAR(20) NOT NULL,
    password    VARCHAR(20) NOT NULL
);