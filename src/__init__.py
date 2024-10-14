##
# @file         __init__.py
# @ver          0.1.0
# @author       arugo11
# @brief        FlaskƒAƒvƒŠ‚Ì‹N“®

from flask import Flask
from .routes import routes

def create_app():
    app = Flask(__name__)
    app.config.from_object('src.config')
    
    app.register_blueprint(routes)
    
    return app

app = create_app()