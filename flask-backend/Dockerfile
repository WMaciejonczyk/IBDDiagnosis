FROM python:3.11

WORKDIR /flask-backend

COPY . /flask-backend

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

ENV FLASK_APP=src/app.py
ENV FLASK_RUN_HOST=0.0.0.0

CMD ["flask", "run"]