# Import 
from flask import jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
import uuid
from datetime import datetime, timezone
# Database Import
from models import notes_collection

# Notes Blueprint
notes_bp = Blueprint("notes",__name__)

# Create Notes
@notes_bp.route("/create_notes",methods=['POST'])
@jwt_required()
def createNotes():
    notesdata = request.json
    user_id = get_jwt_identity()
    # Create New Note
    new_notes = {
        "user_id": user_id,
        "note_id":str(uuid.uuid4()),
        "note_title":notesdata["note_title"],
        "note_content":notesdata["note_content"],
        "last_update":datetime.now(timezone.utc),
        "created_on":datetime.now(timezone.utc),
    }
    notes_collection.insert_one(new_notes)
    return jsonify({"message":"Notes Created Successfully", 
                    "note_id":new_notes["note_id"],
                    "note_title":new_notes["note_title"],
                    "note_content":new_notes["note_content"],
                    }), 201

# Get All the Notes
@notes_bp.route("/get_notes",methods=["GET"])
@jwt_required()
def getAllNotes():
    user_id = get_jwt_identity()
    notes = list(notes_collection.find({"user_id":user_id}))
    for note in notes:
        note["_id"] = str(note["_id"])  
    
    return jsonify(notes), 200  
   
# Update the Notes
@notes_bp.route("/update_notes/<id>", methods=['PUT'])
@jwt_required()
def update_notes(id):
    user_id = get_jwt_identity()
    data = request.json
    notes_collection.update_one(
        {"note_id":str(id), "user_id":str(user_id)},
        {"$set":{**data, "last_update": datetime.now(timezone.utc)}}
        )
    return jsonify({"message":"Notes Updated Successfully"}), 201

# Delete Notes
@notes_bp.route("/delete_notes/<id>", methods=['DELETE'])
@jwt_required()
def delete_notes(id):
    user_id = get_jwt_identity()
    notes_collection.delete_one({"user_id":str(user_id),"note_id":str(id)})
    return jsonify({"message":"Notes Deleted Successfully"}), 201