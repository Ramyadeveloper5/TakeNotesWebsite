# Importing
from flask import Flask, Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
import uuid
from datetime import datetime, timezone
# Import Database Collection
from models import users_collection

# Create Blueprint for Users
auth_bp = Blueprint("auth",__name__)

# User Registration Route
@auth_bp.route("/register", methods=['POST'])
def userRegister():
    inputData = request.json
    # Check user exists or not
    user = users_collection.find_one({"user_email":inputData["user_email"]})
    if user:
        return jsonify({"error":"User Already Registered...!"}), 400
    
    # Create New User
    create_user = {
            "user_id":str(uuid.uuid4()),
            "user_name":inputData["user_name"],
            "user_email":inputData["user_email"],
            "password":generate_password_hash(inputData["password"]),
            "last_update":datetime.now(timezone.utc),
            "created_on":datetime.now(timezone.utc),
        }
    
    users_collection.insert_one(create_user)
    
    return jsonify({"message":"User Registered Successfully"}), 201

# User Login Route
@auth_bp.route("/login", methods=['POST'])
def user_login():
    login_data = request.json
    
    # Fetch User
    user = users_collection.find_one({"user_email":login_data["user_email"]})
    
    
    if user and check_password_hash(user["password"],login_data["password"]):
        token = create_access_token(identity=str(user["user_id"]))
        
        # Include user details in response
        user_data = {
            "user_id": str(user["user_id"]),  # Convert ObjectId to string if using MongoDB
            "name": user["user_name"],  # Store user's name
            "email": user["user_email"]
        }

        return jsonify({"token":token,"user": user_data}), 200
    
    return jsonify({"error":"Invalid Credentials"}), 401



    