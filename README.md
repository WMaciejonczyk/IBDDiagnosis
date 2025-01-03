# Web application for preliminary diagnosis of inflammatory bowel diseases with the use of machine learning

This repository contains a full-stack web application with a Flask backend and a React frontend. Also model training algorithms are included. The project is containerized using Docker Compose for easy deployment and development.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Using Docker Compose](#using-docker-compose)
- [Usage](#usage)

---

## Features

- Flask backend for API development.
- React frontend for a dynamic and interactive user interface.
- TailwindCSS for styling.
- Docker Compose for easy orchestration of backend and frontend services.

---

## Technologies Used

- **Backend:** Flask (Python)
- **Frontend:** React, TailwindCSS, TypeScript
- **Model training:** Jupyter Notebook
- **Testing:** Pytest, Jest
- **Containerization:** Docker, Docker Compose

---

## Project Structure

<!-- TREEVIEW START -->

    IBDDiagnosis/
    ├── flask-backend/              # Backend service (Flask)
    │   ├── src/
    │   │   ├── app.py              # Main Flask application
    │   │   └── test_app.py         # Test file for main app
    │   ├── requirements.txt        # Backend dependencies
    │   └── Dockerfile              # Backend Dockerfile
    ├── react-frontend/             # Frontend service (React)
    │   ├── src/
    │   ├── public/
    │   ├── package.json            # Frontend dependencies
    │   └── Dockerfile              # Frontend Dockerfile
    ├── notebooks/
    │   ├── config.json
    │   ├── UlcerativeColitis.ipynb # Algorithm for UC model
    │   ├── CrohnDisease.ipynb      # Algorithm for CD model
    ├── docker-compose.yml          # Docker Compose file for orchestration
    ├── README.md                   # Project documentation
    └── LICENSE                     # MIT License
    
<!-- TREEVIEW END -->

---

## Setup and Installation

### Using Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/WMaciejonczyk/IBDDiagnosis.git
   cd IBDDiagnosis
2. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
3. Access the application:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

4. To stop the application
   ```bash
   docker-compose down
## Usage
- Open the frontend at http://localhost:3000 to interact with the application.
- The frontend communicates with the Flask backend at http://localhost:5000.
