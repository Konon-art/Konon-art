# GitHub複数アカウント 使い分けガイド

このPCでの複数アカウント設定は完了しています。このファイルは、今後プロジェクトごとに`xRon0s`と`Konon-art`のアカウントをどう使い分けるか、その**使い方だけ**をまとめたものです。

---

## 3つの基本ルール

1.  **`Konon-art`のリポジトリを扱うときは、URLの`github.com`を`github.com-konon`に書き換える。**
2.  **プロジェクト（フォルダ）ごとに、作者情報（ユーザー名とメールアドレス）を必ず設定する。**
3.  **操作はすべて`git`コマンドで行う。（GitHub Desktopなどのアプリは使わない）**

---

## シナリオ1：新しいリポジトリをGitHubからPCに持ってくる（`git clone`）

### Case 1-A: `xRon0s`のアカウントでリポジトリをクローンする場合

1.  GitHubの`xRon0s`のリポジトリページで、`Code`ボタンを押し、`SSH`タブを選択します。
2.  表示されたURL（`git@github.com:xRon0s/リポジトリ名.git`）をコピーします。
3.  PowerShellで、プロジェクトを置きたいフォルダに移動し、以下のコマンドを実行します。
    ```powershell
    # 例
    git clone git@github.com:xRon0s/some-repo.git
    ```
4.  クローンしたフォルダに移動し、**作者情報を設定します。**
    ```powershell
    cd some-repo
    git config user.name "xRon0s"
    git config user.email "your-xronos-email@example.com"
    ```

### Case 1-B: `Konon-art`のアカウントでリポジトリをクローンする場合

1.  GitHubの`Konon-art`のリポジトリページで、`Code`ボタンを押し、`SSH`タブを選択します。
2.  表示されたURL（`git@github.com:Konon-art/リポジトリ名.git`）をコピーします。
3.  PowerShellで、コピーしたURLの`github.com`を`github.com-konon`に**書き換えて**コマンドを実行します。

    **元のURL**: `git@github.com:Konon-art/Konon-art.git`
    ↓
    **書き換えたコマンド**:
    ```powershell
    git clone git@github.com-konon:Konon-art/Konon-art.git
    ```
4.  クローンしたフォルダに移動し、**作者情報を設定します。**
    ```powershell
    cd Konon-art
    git config user.name "Konon-art"
    git config user.email "your-konon-email@example.com"
    ```

---

## シナリオ2：すでにPCにあるプロジェクトのアカウントを正しく設定する

`https`でクローンしてしまったプロジェクトや、アカウント設定が間違っているプロジェクトの接続先を修正します。

1.  PowerShellで、対象のプロジェクトフォルダ（例: `port_il`）に移動します。
    ```powershell
    cd C:\Users\cat7p\デスクトップ\デスクトップ\port_il
    ```
2.  現在の接続先URLを確認します。
    ```powershell
    git remote -v
    ```
    もしURLが`https://...`で始まっていたり、`github.com-konon`になっていなければ修正が必要です。

3.  **接続先URLを正しいものに変更します。**

    *   **`Konon-art`のリポジトリの場合**:
        ```powershell
        git remote set-url origin git@github.com-konon:Konon-art/Konon-art.git
        ```
    *   **`xRon0s`のリポジトリの場合**:
        ```powershell
        git remote set-url origin git@github.com:xRon0s/some-repo.git
        ```
        （`:xRon0s/some-repo.git`の部分はリポジトリ名に合わせて変更）

4.  **作者情報を設定します。**
    *   **`Konon-art`のリポジトリの場合**:
        ```powershell
        git config user.name "Konon-art"
        git config user.email "your-konon-email@example.com"
        ```
    *   **`xRon0s`のリポジトリの場合**:
        ```powershell
        git config user.name "xRon0s"
        git config user.email "your-xronos-email@example.com"
        ```

---

## シナリオ3：PCで先にプロジェクトを作り、後からGitHubに公開する

この手順が最も間違いやすいポイントです。`git remote add origin` のコマンドで、アカウントを正しく指定する必要があります。

1.  **GitHub上で、からのリポジトリを先に作成する**
    *   `Konon-art`アカウントでログインし、新しいリポジトリを作成します。（例: `new-project`）
    *   **重要**: `README`や`.gitignore`を追加せず、完全に空の状態で作成してください。

2.  **PCのプロジェクトフォルダでGitリポジトリを初期化する**
    *   PowerShellで、対象のプロジェクトフォルダに移動します。
    *   以下のコマンドを実行します。
        ```powershell
        git init
        git add .
        git commit -m "Initial commit"
        ```

3.  **接続先（リモート）を、正しいアカウントを指定して追加する**
    *   GitHubで作成したリポジトリページに表示されているSSHのURLをコピーします。
    *   **`Konon-art`のリポジトリの場合**は、URLを書き換えて `git remote add` コマンドを実行します。

        **元のURL**: `git@github.com:Konon-art/new-project.git`
        ↓
        **書き換えたコマンド**:
        ```powershell
        git remote add origin git@github.com-konon:Konon-art/new-project.git
        ```

    *   **`xRon0s`のリポジトリの場合**は、そのままのURLでOKです。
        ```powershell
        git remote add origin git@github.com:xRon0s/new-project.git
        ```

4.  **作者情報を設定する**
    *   `Konon-art`のリポジトリの場合:
        ```powershell
        git config user.name "Konon-art"
        git config user.email "your-konon-email@example.com"
        ```

5.  **GitHubにプッシュする**
    ```powershell
    git branch -M main
    git push -u origin main
    ```

---

## シナリオ4：VSCodeの拡張機能でリポジトリを新規作成・公開する場合

この方法は、VSCodeにログインしているアカウントでリポジトリが作成されてしまうため、**サブアカウント（`Konon-art`）でリポジトリを作りたい場合は、一手間かける必要があります。**

#### Case 4-A: メインアカウント (`xRon0s`) でリポジトリを作成する場合

この場合は簡単です。

1.  VSCodeの左下にあるアカウントアイコンで、`xRon0s`としてサインインしていることを確認します。
2.  GitGraphなどの拡張機能で「リポジトリを公開」を実行します。
3.  拡張機能が自動的にリモートURLを設定し、プッシュまで行います。
4.  最後に、念のためプロジェクトのフォルダで**作者情報**を設定しておきましょう。
    ```powershell
    git config user.name "xRon0s"
    git config user.email "your-xronos-email@example.com"
    ```

#### Case 4-B: サブアカウント (`Konon-art`) でリポジトリを作成したい場合 (重要)

VSCodeの機能で`Konon-art`のリポジトリを直接作成することは諦め、**作成されたリポジトリの接続先を後から手動で修正する**のが最も確実です。

1.  **VSCodeの機能で、一旦リポジトリを公開する。**
    *   この時点では、VSCodeにログインしている`xRon0s`アカウント上にリポジトリが作成されてしまいます。これは仕方がありません。

2.  **GitHubサイト上でリポジトリの所有権を移管（Transfer）する。**
    *   ブラウザでGitHubにログインします。
    *   `xRon0s`アカウントに作成されてしまったリポジトリのページを開きます。
    *   `Settings` -> `General` の一番下にある `Danger Zone` に `Transfer ownership` という項目があります。
    *   ここで、リポジトリの所有者を `Konon-art` に変更します。

3.  **PC上のプロジェクトの接続先URLを、`Konon-art`用に修正する。**
    *   所有権を移管したので、PC側の接続先も`Konon-art`用に変更する必要があります。
    *   PowerShellでプロジェクトフォルダに移動し、**シナリオ2**で説明した `git remote set-url` コマンドを実行します。
        ```powershell
        # 接続先をKonon-art用に書き換える
        git remote set-url origin git@github.com-konon:Konon-art/リポジトリ名.git
        ```

4.  **作者情報を`Konon-art`用に設定する。**
    ```powershell
    git config user.name "Konon-art"
    git config user.email "your-konon-email@example.com"
    ```

---

これで、このファイルを見ればいつでも迷わず2つのアカウントを使い分けられるはずです。

