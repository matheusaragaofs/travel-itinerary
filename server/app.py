from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from services.generate_itinerary import generate_itinerary
from templates.prompt_template import prompt_template
from models.llm_models import get_model

load_dotenv()

app = Flask(__name__)
CORS(app)
cors = CORS(app, resource={r"/*": {"origins": "*"}})


@app.route("/generate-itinerary", methods=["POST"])
def home():
    llm = get_model("openai")

    data = request.json
    print("DATA", data)
    destination = data.get("destination")
    print("DATA destination", destination)
    travel_period = data.get("travel_period")
    preffered_travel_styles = data.get("preffered_travel_styles")
    budget = data.get("budget")

    try:
        response = generate_itinerary(
            llm,
            prompt_template,
            destination,
            travel_period,
            preffered_travel_styles,
            budget,
        )

    except Exception as e:
        return jsonify(
            {
                "status": "error",
                "message": "Invalid response from generate_itinerary",
                "error": str(e),
            }
        )

    return response


if __name__ == "__main__":
    app.run(debug=True)
