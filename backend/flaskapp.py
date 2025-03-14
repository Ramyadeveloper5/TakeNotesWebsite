# Importing
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
# Import Routes File
from routes.authRoutes import auth_bp
from routes.notesRoutes import notes_bp

# Database Configuration Link
from dbconfig import DatabaseConfig

# App Intialize
app = Flask(__name__)

# Database Link
app.config.from_object(DatabaseConfig)

CORS(app)
jwt = JWTManager(app)

# Blueprint Register
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(notes_bp, url_prefix="/notes")


# App Run
if __name__ == '__main__':
    app.run(debug=True)