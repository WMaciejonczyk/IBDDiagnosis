import os

from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from joblib import load
import pandas as pd
from flask_cors import CORS
pd.set_option('display.max_columns', None)

app = Flask(__name__)
CORS(app)

# Flask-Mail Configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'ibddiagnosis@gmail.com'
app.config['MAIL_PASSWORD'] = 'zrio itxp jnin gsil'

mail = Mail(app)


def locale_mapping(parameter):
    mapping = {
        # Ulcerative Colitis
        "CEA": "CEA",
        "Cholesterol": "Cholesterol LDL",
        "HBE": "HBE ANTYGEN  INTERPRETACJA",
        "Parasites in the stool": "KAŁ NA PASOŻYTY (MET MIKROSKOPOWA)",
        "Calprotectin": "Kalprotektyna w kale",
        "Creatinine": "Kreatynina w surowicy.",
        "Glucose in urine": "MOCZ - BADANIE OGÓLNE GLUKOZA",
        "Bacteries in urine": "MOCZ - BADANIE OGÓLNE BAKTERIE.",
        "Hemoglobin": "MORFOLOGIA 5 DIFF HEMOGLOBINA",
        "Leucocytes": "MORFOLOGIA LEUKOCYTY",
        "P-LCR": "MORFOLOGIA P-LCR",
        "OB": "OB",
        # Crohn's Disease
        "ASPAT": "ASPAT",
        "Bilirubin": "Bilirubina całkowita",
        "Alkaline phosphatase": "FOSFATAZA ALKALICZNA",
        "Basophils": "MORFOLOGIA 5 DIFF BAZOFILE",
        "Erythroblasts": "MORFOLOGIA 5 DIFF ERYTROBLASTY #",
        "Hematocrit": "MORFOLOGIA 5 DIFF HEMATOKRYT",
        "MCHC": "MORFOLOGIA 5 DIFF MCHC",
        "Monocytes": "MORFOLOGIA 5 DIFF MONOCYTY#",
        "MPV": "MORFOLOGIA 5 DIFF MPV",
        "Neutrophils": "MORFOLOGIA 5 DIFF NEUTROFILE",
        "Potassium": "Potas",
        # Both
        "Erythrocytes": "MORFOLOGIA 5 DIFF ERYTROCYTY",
        "MCH": "MORFOLOGIA 5 DIFF MCH",
        "Gender": "Płeć",
        "Age": "Wiek"
    }
    return mapping[parameter]


def make_prediction(pipeline, data):
    params = data.get_json()
    data_dict = {}
    for key in params:
        if key != "disease":
            data_dict[locale_mapping(key)] = [float(params[key])]
    data_for_prediction = pd.DataFrame(data_dict)
    result = pipeline.predict(data_for_prediction)
    return result


@app.route("/predict", methods=["POST", "GET"])
def predict():
    if request.method == "POST":
        # Selecting model
        model_selected = request.get_json().get("disease")
        current_dir = os.path.dirname(os.path.abspath(__file__))
        if model_selected == "Ulcerative Colitis":
            model_path = os.path.join(current_dir, "../models/RandomForest_UC.pkl")
            pipeline = load(model_path)
        else:
            model_path = os.path.join(current_dir, "../models/RandomForest_CD.pkl")
            pipeline = load(model_path)
        result = make_prediction(pipeline, request)
        response = ""
        if result[0] == 1:
            response = "positive"
        if result[0] == 0:
            response = "negative"

        return response


@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    name = data.get('name')
    title = data.get('title')
    message = data.get('message')
    email = data.get('email')

    # Define the message you want to send
    msg = Message(
        subject=f"{title}",
        recipients=["exil122@gmail.com"],  # Change to Professor's mail on deployment
        body=f"Wiadomość od: {name} \nKontakt: {email}\n\n{message}",
        sender="ibddiagnosis@gmail.com"
    )

    try:
        # Send the email
        mail.send(msg)
        return jsonify({"status": "success", "message": "Email sent successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


if __name__ == '__main__':
    app.run()
