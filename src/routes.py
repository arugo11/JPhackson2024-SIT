from flask import Blueprint, render_template, request, jsonify, make_response
from .utils import generate_json_from_text
import logging
from json import dumps
from logging import getLogger

routes = Blueprint('routes', __name__)

@routes.route('/', methods=['GET', 'POST'])
def generate():
    if request.method == 'POST':
        text = request.form.get('text', '')
        logging.debug(f"Received text: {text}")

        try:
            result = generate_json_from_text(text)
            response = make_response(dumps(result,ensure_ascii=False))
            response.headers['Content-Type'] = 'application/json; charset=utf-8'
            return response
        except Exception as e:
            logging.error(f"Error processing data: {str(e)}")
            return jsonify({'error': str(e)}), 500
    return render_template('base.html')