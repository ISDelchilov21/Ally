from flask import Flask, jsonify, request, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from models import User, db

app = Flask("__name__")


app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:1234@localhost/ally"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'edgfhjhk'

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return "Home"

@app.route("/signup", methods=["POST"])
def sign_up():
    data = request.json

    fname = data["FullName"]
    email = data["Email"]
    username = data["UserName"]
    password = data["Password"]

    if email == '':
        return jsonify({"Message": "Email cannot be empty"}), 400

    user_exist = User.query.filter_by(Email=email).first() is not None

    if user_exist:
        return jsonify({"Message": "Email already exists in the database"}), 409

    new_user = User(FullName=fname, Email=email, UserName=username, Password=password)

    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.Id

    return jsonify({"message": "I've just registered!",
                    "id": new_user.Id,
                    "email": new_user.Email
                    })
    
@app.route("/login", methods=["POST"])
def login_user():
    username = request.json['UserName']
    password = request.json['Password']

    user = User.query.filter_by(UserName=username).first()
    if user and password:
        return jsonify({"message": "Login successful", "user_id": user.Id}),200
    else:
        return jsonify({"message": "Invalid username or password"}), 401

if __name__ == "__main__":
    app.run(debug=True)