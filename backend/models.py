# Importing
from pymongo import MongoClient
# Database Config File
from dbconfig import DatabaseConfig

client = MongoClient(DatabaseConfig.MONGO_URL)
database = client.notestakingapp

# Create Database Table for Notes Taking App
users_collection = database['users']
notes_collection = database['notes']
