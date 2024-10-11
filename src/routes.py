from flask import Blueprint, render_template, request, jsonify
import logging

routes = Blueprint('routes', __name__)

@routes.route('/', methods=['GET', 'POST'])
def generate():
    if request.method == 'POST':
        text = request.form.get('text', '')
        logging.debug(f"Received text: {text}")

        try:
            return jsonify({'result': f"{text}"})
        except Exception as e:
            logging.error(f"Error processing data: {str(e)}")
            return jsonify({'error': str(e)}), 500
    return render_template('base.html')