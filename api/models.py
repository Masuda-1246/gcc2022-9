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
class EventModel(CommonModel):
  def list(self):
    result = []
    select_stmt = sqlalchemy.text('''
SELECT * FROM event
'''[1:-1])
    with self.db.connect() as conn:
        for row in conn.execute(
                select_stmt,
        ).fetchall():
            result.append(dict(
                event_id=row[0],
                auther=row[1],
                title=row[2],
                description=row[3],
                url=row[4],
                tags=row[5],
                date=row[6],
                created_at=row[7],
        ))
        print(result)
    return result

  def createEvent(self,auther,title,description,url,tags,date):
    insert_stmt = sqlalchemy.text('''
INSERT INTO event (
    auther,
    title,
    description,
    url,
    tags,
    date
) values(
    :auther,
    :title,
    :description,
    :url,
    :tags,
    :date
);
'''[1:-1]
            )
    with self.db.connect() as conn:
        conn.execute(
            insert_stmt,
            auther=auther,
            title=title,
            description=description,
            url=url,
            date=date,
            tags=tags,
        )

  def updateEvent(self,event_id,auther,title,description,url,tags,date):
    insert_stmt = sqlalchemy.text('''
UPDATE event SET
    auther = :auther,
    title = :title,
    description = :description,
    url = :url,
    tags = :tags,
    date = :date
    where event_id = :event_id;
'''[1:-1]
            )
    with self.db.connect() as conn:
        conn.execute(
            insert_stmt,
            event_id=event_id,
            auther=auther,
            title=title,
            description=description,
            url=url,
            date=date,
            tags=tags,
        )

  def updateEvent(self,event_id,auther,title,description,url,tags,date):
    insert_stmt = sqlalchemy.text('''
UPDATE event SET
    auther = :auther,
    title = :title,
    description = :description,
    url = :url,
    tags = :tags,
    date = :date
    where event_id = :event_id;
'''[1:-1]
            )
    with self.db.connect() as conn:
        conn.execute(
            insert_stmt,
            event_id=event_id,
            auther=auther,
            title=title,
            description=description,
            url=url,
            date=date,
            tags=tags,
        )

  def deleteEvent(self,event_id):
    insert_stmt = sqlalchemy.text('''
DELETE FROM event where event_id = :event_id
'''[1:-1]
            )
    with self.db.connect() as conn:
        conn.execute(
            insert_stmt,
            event_id=event_id,
        )