# Project: Full-Stack Note-Taking Application

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Docker**: [Docker installation instructions](https://docs.docker.com/engine/install/)
2. **Docker Compose**: [Docker Compose installation instructions](https://docs.docker.com/compose/install/)

**Note**: Even if you don't have Docker or Docker Compose installed, the `start-project` script will verify their presence and install them if necessary. This ensures that your environment is properly set up before running the application.

Once the setup is complete, just open port `3000` in your browser and enjoy the app! 😊

## 🚀 Execution

Follow these steps to set up and run the PostgreSQL container, frontend, and backend:

1. **Clone the Repository**
    ```bash
    git clone https://github.com/ensolvers-github-challenges/Burckhardt-efadb5.git
    cd Notes
    ```

2. **Run the Setup Script**
    If you have the `start-project.sh` script, make it executable and run it:
    ```bash
    chmod +x start-project.sh
    sudo ./start-project.sh
    ```
This script will:

- Remove any existing containers named `noteschallenge-davidburckhardt-db`, `noteschallenge-davidburckhardt-frontend`, and `noteschallenge-davidburckhardt-backend`.
- Start the PostgreSQL container using the official `postgres:16` image. The database will be set up with the following configuration:
  - **User**: `davidnotes`
  - **Password**: `1234`
  - **Database**: `notes`
  - Mounted volume for persistent storage at `/var/lib/postgresql/data`.
  - Initialization script mounted from `./init.sql`.
  - Health check to ensure the database is ready before other services start.
- Launch the frontend container on port `3000` using a custom build context from the `./frontend` directory.
- Launch the backend container on port `8080` using a custom build context from the `./backend` directory.
  - The backend service depends on the database service and will only start once the database is healthy.

### API Documentation

The API documentation is available through Swagger. Make sure to run the project beforehand!!!

Access the Swagger interface to explore and test the API endpoints via this link:

[Swagger UI](http://localhost:8080/swagger-ui.html)

## Project Description

This project demonstrates a full-stack application setup. The app is a simple web-based note-taking tool that allows users to:

- **Take Notes**: Create, edit, delete, and mark notes as active or archived.
- **Tag Notes**: Organize notes with tags.
- **Filter Notes**: Search and filter notes based on tags and their status (active or archived).

### Technology Stack

The application components include:

- **PostgreSQL Database**: A robust and reliable relational database system that stores the application's data. The PostgreSQL container is configured to run on port `5432`.
- **Frontend**: Built with **React**, a popular JavaScript library for building user interfaces. The frontend interacts with the backend and presents data to users, running on port `3000`.
- **Backend**: Developed using **Java** with **Spring Boot**, a powerful framework for building production-ready applications. The backend handles business logic, data processing, and communicates with the PostgreSQL database. It runs on port `8080`.


