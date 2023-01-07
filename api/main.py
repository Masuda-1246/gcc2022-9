import sqlalchemy

from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from datetime import timedelta

from models import UserModel

app = Flask(__name__)

app.secret_key = '87d392b7a59f4a978fa9791bf984dcf7'
app.permanent_session_lifetime = timedelta(weeks=1)
bcrypt = Bcrypt(app)

CORS(
  app,
  supports_credentials=True
)

def connect_unix_socket(db_config={}):
    pool = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL.create(
            drivername='mysql+pymysql',
            username="gcc2022grp9",
            password="qhu33fuugM",
            database="gcc2022grp9db",
            host="34.146.197.98",
        ),
        pool_size=5,
        max_overflow=2,
        pool_timeout=30,  # 30 seconds
        pool_recycle=1800,  # 30 minutes
    )
    return pool

def migrate_db(db):
    """
    利用テーブルの初期化
    """

    sqls = []
    # イベントを管理するテーブルを作成
    sqls.append('''
CREATE TABLE IF NOT EXISTS user
(
    user_id VARCHAR(256),
    email VARCHAR(256),
    password VARCHAR(256)
)
'''[1:-1]
    )
    # 回答を管理するテーブルの作成
    with db.connect() as conn:
        for sql in sqls:
            conn.execute(sql)

db = connect_unix_socket()
migrate_db(db)

@app.route("/", methods=['GET'])
def index():
  print(session.get("user_id"))
  return jsonify({"hello":"a"})

@app.route("/register",methods=['POST'])
def register():
  email = request.json["email"]
  password = request.json["password"]
  model = UserModel(db)
  if model.getUser(email):
        return jsonify({"error": "User already exists"}), 409
  hashed_password = bcrypt.generate_password_hash(password)
  id = model.createUser(email, hashed_password)
  session["user_id"] = id
  return jsonify({
    "user_id":id,
    "email":email
  })

@app.route("/login",methods=['POST'])
def login():
  result = []
  email = request.json["email"]
  password = request.json["password"]
  model = UserModel(db)
  result = model.getUser(email)
  if not result:
    return jsonify({"error": "Unauthorized"}), 401
  if not bcrypt.check_password_hash(result["password"],password):
    return jsonify({"error": "Unauthorized"}), 401
  session["user_id"] = result["user_id"]
  return jsonify({
    "user_id":result["user_id"],
    "email":result["email"]
  })

@app.route("/userlist", methods=['GET'])
def showUserList():
  model = UserModel(db)
  list = model.list()
  return list


@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route("/auth",methods=["POST"])
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    model = UserModel(db)
    email = model.getEmail(user_id)
    if not email:
      return jsonify({"error": "Unauthorized"}), 401
    return jsonify({
      "user_id":user_id,
      "email":email
    })
