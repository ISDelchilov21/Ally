from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    Id = db.Column(db.Integer, primary_key=True)
    FullName = db.Column(db.String(225), nullable=False)
    Email = db.Column(db.String(225), unique = True, nullable = False)
    UserName = db.Column(db.String(255), unique = True, nullable = False)
    Password  = db.Column(db.String(100), nullable = False)