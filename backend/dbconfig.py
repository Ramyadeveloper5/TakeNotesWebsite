import os

class DatabaseConfig:
    secret_key = os.urandom(64)
    print("Secret Key",secret_key)
    SECRET_KEY = "secret_key"
    MONGO_URL = "mongodb://localhost:27017/notestakingapp"