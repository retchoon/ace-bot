# 概要

「敗北者」という単語に反応して、メンションを飛ばしたり、ボイスチャンネルに乱入して音声を流す bot です。  
このリポジトリを管理する気はないです。使用、改良、再配布など完全にご自由にお使いください。

# 導入方法

ターミナルや cd コマンドは知っている前提で書きます。分からない人はググってください。

1. [このページ](https://qiita.com/taiponrock/items/9001ae194571feb63a5e)を参考にNode.js のインストールをする
2. [このページ](https://qiita.com/toshi-click/items/dcf3dd48fdc74c91b409)を参考にgitをインストールする
3. ターミナル(windowsは`Windowsキー+s` → `cmd` で検索して「コマンドプロンプト」を開く)を開き、`git clone https://github.com/retchoon/ace-bot.git`する
4. `cd ace-bot`とコマンドを打ち ace-bot ディレクトリに移動した後、`npm install`とコマンドを打つ
5. [Discord Developer サイト](https://discordapp.com/developers/applications/)から アプリケーションを作成した後 bot を作成する。
6. `https://discordapp.com/oauth2/authorize?client_id=クライアントID&permissions=31477768&scope=bot`にアクセスし、bot を任意のサーバーに追加する。（URL のクライアント ID の部分を、4 で作成したアプリケーションの id に変更してください。`General Information`ってとこクリックしたら`CLIENT ID`ってやつがあるはずです。)
7. `.token`ファイルに 4 で作成した bot のトークンをコピペし、ファイル名を`token`に変更する(token は他人に知られないよう注意)
8. ここまでで bot の起動をしてみても動かなかったら下記コマンド試してください
   ```shell
    # windows環境
    npm install --global windows-build-tools
    # 共通
    npm install discord.js
    npm install ffmpeg-binaries
    # 下記の2つのうちどちらか
    npm install node-opus
    npm install opusscript
   ```

# 使い方

## bot の起動

1. ターミナルを開き、該当ディレクトリまで移動する
2. `node App.js`とコマンドをうつ
3. うまくいったら「Logged in as bot 名#4 桁数字」みたいな表示が出て準備完了

## テキストの追加

`texts.txt`ファイルを編集してください。

- `""`の中に発言させたい内容を入れてください
- `,`で区切ってください
- 改行は、改行したい場所に`\n`を入れればできると思います。

## 音声ファイルの追加

voices フォルダの中に音声ファイルを追加してください。  
`m4a`,`mp3`に最低限対応しています。  
音声の最後に 1 秒弱何もない部分があった方が再生したい部分をうまく再生できると思います。

## 挙動の変更

反応させたい単語をいじりたい場合は`App.js`を編集して、「敗北者」の部分を別の単語に変更してください

# 挙動

1. ボイスチャンネル内にいる人がテキストチャンネルで bot 宛に「敗北者」という単語を含むメンションを送ったら、そのボイスチャンネルに bot が乱入し、`voices`フォルダ内の音声ファイルのいずれか 1 つをランダムで選択して流します。流し終えたらそのボイスチャンネルから切断します。
2. メンション・非メンション問わずテキストチャンネルで「敗北者」という単語を含むメッセージをしたら、そのメッセージに対し`texts.txt`ファイル内の中の文字列から 1 つランダムで選択してメンションを飛ばします。

チャンネルにアクセスする権限が bot になかったり、空きがないボイスチャンネル内でパターン 1 を行った場合はエラーが出ます。
