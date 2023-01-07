import sqlalchemy
from uuid import uuid4
  
class CommonModel:
  def __init__(self, db=None):
    self.db = db

class UserModel(CommonModel):
  def list(self):
    result = []
    select_stmt = sqlalchemy.text('''
SELECT * FROM user
'''[1:-1])
    with self.db.connect() as conn:
        for row in conn.execute(
                select_stmt,
        ).fetchall():
            result.append(dict(
                user_id=row[0],
                email=row[1],
                password=row[2],
        ))
        print(result)
    return result

  def getEmail(self, user_id):
    email = ""
    select_stmt = sqlalchemy.text('''
SELECT email FROM user where user_id = :user_id
'''[1:-1]
  )
    with self.db.connect() as conn:
        for row in conn.execute(
                select_stmt,
                user_id=user_id,
        ).fetchall():
          email = row[0]
    print(email)
    return email

  def getUser(self, email):
    result = {}
    select_stmt = sqlalchemy.text('''
SELECT * FROM user where email = :email
'''[1:-1]
  )
    with self.db.connect() as conn:
        for row in conn.execute(
                select_stmt,
                email=email,
        ).fetchall():
            result = dict(
                user_id=row[0],
                email=row[1],
                password=row[2],
        )
    return result

  def createUser(self, email, password):
    id = uuid4().hex
    insert_stmt = sqlalchemy.text('''
INSERT INTO user (
    user_id,
    email,
    password
) values(
    :id,
    :email,
    :password
);
'''[1:-1]
            )
    with self.db.connect() as conn:
        conn.execute(
            insert_stmt,
            id=id,
            email=email,
            password=password,
        )
    return id