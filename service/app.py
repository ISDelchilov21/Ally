from flask import Flask, jsonify, request, session
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from models import User, db
from flask_socketio import SocketIO, join_room,leave_room, send
from flask_jwt_extended import JWTManager, create_access_token, jwt_required,get_jwt_identity, decode_token


app = Flask("__name__")
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://192.168.1.6:3000"]}}, supports_credentials=True)
app.config['SESSION_TYPE'] = 'filesystem'
app.config.from_object(__name__)
app.secret_key = 'zele'
app.config['CORS_HEADERS'] = 'Content-Type'


app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:1234@localhost/ally"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'edgfhjhk'
app.config["JWT_SECRET_KEY"] = "your-secret-key"
socketio = SocketIO(app, cors_allowed_origins="*")
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db.init_app(app)

sess = Session()


with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return "Home"

@app.route("/signup", methods=["POST"])
def sign_up():

    data = request.json
    fname = data["Fullname"]
    city = data["City"]
    school = data["School"]
    grade = data["Grade"]
    email = data["Email"]
    username = data["Username"]
    password = data["Password"]
    
    userinfo = data.get("UserInfo", "default value")
    
    if email == '':
        return jsonify({"Message": "Email cannot be empty"}), 400
   
    user_exist = User.query.filter_by(Email=email).first() is not None
    
    if user_exist:
        return jsonify({"Message": "Email already exists in the database"}), 409
    
    new_user = User(Fullname=fname, Email=email, Username=username, Password=password, City=city, School=school, Grade=grade, UserInfo=userinfo)
    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.Id
    
    access_token = create_access_token(identity=new_user.Id)
    return jsonify({"message": "User registered successfully", "access_token": access_token})



@app.route("/login", methods=["POST"])
def login_user():
    if 'Username' in request.json and 'Password' in request.json:
        username = request.json['Username']
        password = request.json['Password']
        user = User.query.filter_by(Username=username).first()
        if user is not None and user.Password == password:
            session["user_id"] = user.Id  
            access_token = create_access_token(identity=user.Id)
            session["access_token"] = access_token

            print(f"user_id = {session["user_id"]}")
            response = jsonify({"message": "Login successful", 
                            "user_id": user.Id, 
                            "access_token":access_token
                            })
            response.status_code = 200
            return response
        else:
            return jsonify({"message": "Invalid username or password"}), 401
    
        
    else:    
        return jsonify({"message": "Missing username or password in the request"}), 400

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route("/userdetails", methods=['GET'])
@cross_origin(supports_credentials=True)
@jwt_required()
def get_user_details():
    user_id = get_jwt_identity()

    if user_id:
        user = User.query.get(user_id)
        print(user)
        if user:
            user_data = {
                "username": user.Username,
                "email": user.Email,
                "fullname": user.Fullname,
                "city": user.City,
                "school": user.School,
                "grade": user.Grade,
                "bio": user.UserInfo
            }
            return jsonify(user_data), 200
        else:
            return jsonify({"message": "User not found in the database"}), 404
    else:
        return jsonify({"message": "User_id not found in session"}), 404

@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)

@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
@app.route("/users") 
def get_users():
    users = User.query.all()
    user_data = [
        {"id": user.Id, "username": user.Username} for user in users
    ]
    return jsonify(user_data)
@socketio.on("message")
def message(data):
    user_id = session.get('user_id') 
    username = data.get("username", "Uknown")  # Get the username of the user who sent the message
    message = data.get("message")
    room = data.get("room", "default")
    send({
        "message": message, 
        "room": room, 
        "username": username, 
        "user_id": user_id 
    }, room=room)


@app.route("/usernames")  
def get_usernames():
    usernames = [user.Username for user in User.query.all()]
    return jsonify(usernames) 

if __name__ == "__main__":
    sess.init_app(app)
    socketio.run(app, debug=True)