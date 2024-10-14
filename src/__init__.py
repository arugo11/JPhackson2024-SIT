##
# @file         __init__.py
# @author       arugo11
# @brief        Flask起動とloggerのコンフィグ設定

from flask import Flask
from .routes import routes
import json
from logging import getLogger, config


def create_app():
    app = Flask(__name__)
    app.config.from_object('src.config')
    app.register_blueprint(routes)
    return app


app = create_app()