import hashlib
import jwt
import datetime

users = {}

SECRET_KEY = "chama12345"  

def signup(username, password):
    if username in users:
        return "Username already exists."

    password_hash = hashlib.sha256(password.encode()).hexdigest()
    
    users[username] = password_hash
    return "User signed up successfully."

def signin(username, password):
    if username not in users:
        return "Username does not exist."
    
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    
    if users[username] == password_hash:
        token = generate_token(username)
        return {"message": "User signed in successfully.", "token": token}
    else:
        return "Invalid password."

def generate_token(username):
    expiration = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    
    token = jwt.encode({"username": username, "exp": expiration}, SECRET_KEY, algorithm="HS256")
    return token
