# gcc2022-9

## 階層構造
このアプリケーションの階層構造は以下のようになる
```bash
├── api # バックエンド用
│   ├── app.yaml
│   ├── env_api
│   ├── main.py
│   └── requirements.txt
└── front　# フロント用
    ├── README.md
    ├── app.yaml
    ├── build
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    └── src
```

# 環境構築
バックエンドでvenvの環境をローカルで構築する。
```bash
# バックエンド(api)に移動
cd api
# venvの作成
python3 -m venv env_api # env_api は任意名
# venvの適用
source ./env_api/bin/activate
# 依存関係のインストール
pip3 install -r requirements.txt
```
