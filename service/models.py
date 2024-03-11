from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    Id = db.Column(db.Integer, primary_key=True)
    Fullname = db.Column(db.String(225), nullable=False)
    Email = db.Column(db.String(225), unique = True, nullable = False)
    Username = db.Column(db.String(100), unique = True, nullable = False)
    City = db.Column(db.String(50), nullable = False)
    School = db.Column(db.String(50), nullable = False)
    Grade = db.Column(db.Integer, nullable = False)
    UserInfo = db.Column(db.String(255), nullable = False)
    Password  = db.Column(db.String(100), nullable = False)