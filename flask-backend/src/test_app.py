import json
from unittest.mock import patch

import pytest
from src.app import app  # Assuming the code is in app.py


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_predict_uc(client):
    data = {
        "disease": "Ulcerative Colitis",
        "CEA": "10.5",
        "Cholesterol": "200.5",
        "HBE": "1.2",
        "Parasites in the stool": "0",
        "Calprotectin": "3.4",
        "Creatinine": "1.1",
        "Glucose in urine": "0",
        "Bacteries in urine": "0",
        "Erythrocytes": "44",
        "Hemoglobin": "13.5",
        "MCH": "11",
        "Leucocytes": "4.5",
        "P-LCR": "10.1",
        "OB": "12.0",
        "Gender": "0",
        "Age": "25",

    }
    response = client.post('/predict', data=json.dumps(data), content_type='application/json')
    assert response.status_code == 200
    assert response.data in [b"positive", b"negative"]


def test_predict_cd(client):
    data = {
        "disease": "Crohn's Disease",
        "ASPAT": "11",
        "Bilirubin": "12",
        "Alkaline phosphatase": "123",
        "Basophils": "11",
        "Erythroblasts": "11",
        "Erythrocytes": "11",
        "Hematocrit": "11",
        "MCH": "11",
        "MCHC": "11",
        "Monocytes": "11",
        "MPV": "11",
        "Neutrophils": "11",
        "Potassium": "11",
        "Gender": "0",
        "Age": "25",

    }
    response = client.post('/predict', data=json.dumps(data), content_type='application/json')
    assert response.status_code == 200
    assert response.data in [b"positive", b"negative"]


def test_send_email(client):
    data = {
        "name": "John Doe",
        "title": "IBD Diagnosis Inquiry",
        "message": "Could you provide more details about the diagnosis?",
        "email": "john.doe@example.com"
    }

    # Mock the send method of Mail
    with patch('flask_mail.Mail.send') as mock_send:
        response = client.post('/send-email', json=data)

        mock_send.assert_called_once()

        assert response.status_code == 200
        assert b"Email sent successfully!" in response.data
