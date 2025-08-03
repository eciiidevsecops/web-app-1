# 3-Tier Application

This project demonstrates a basic 3-tier application architecture using Docker Compose. It consists of three main components:
- **Client:** A React.js frontend application.
- **Server:** A Node.js (Express) backend API.
- **Database:** A MySQL database.

## Project Structure

The project is organized into three main directories, each representing a tier of the application:

- `client/`: Contains the React frontend application. This is where your user interface code resides.
- `server/`: Contains the Node.js (Express) backend API. This handles business logic and communication with the database.
- `database/`: Contains the MySQL database setup, including its Dockerfile and initial schema.
- `docker-compose.yml`: Defines how the three services (client, server, database) are linked and orchestrated using Docker.
- `README.md`: This file, providing an overview and instructions for the application.

## Getting Started

Follow these steps to get the application up and running on your local machine.

1.  **Clone the repository:**

    First, clone this repository to your local machine using Git:

    ```bash
    git clone <repository-url>
    cd 3-tier-app
    ```

2.  **Build and run the Docker containers:**

    Navigate to the root directory of the `3-tier-app` project (where `docker-compose.yml` is located) and run the following command:

    ```bash
    docker-compose up --build
    ```

    This command will perform the following actions:
    - **`--build`**: This flag ensures that Docker images for the `client`, `server`, and `database` are built from their respective `Dockerfile`s. If images already exist and you haven't changed the `Dockerfile`s, you can omit this flag for faster startup.
    - It will pull the necessary base images (e.g., `node:18-alpine` for client/server, `mysql:8.0` for database).
    - It will install dependencies for the client and server.
    - It will start all three services in the correct order (database -> server -> client due to `depends_on` in `docker-compose.yml`).
    - It will map the specified ports from the containers to your host machine.

3.  **Access the application:**

    Once all services are up and running, you can access the application:
    - **Client (Frontend):** Open your web browser and navigate to `http://localhost:3000`. You should see the React application displaying a message from the server and a list of users (initially empty or pre-populated if your schema.sql adds data).
    - **Server API (Backend):** The server API is running internally on port `5000` within the Docker network and is exposed to `localhost:5000` on your host. You can test it directly by visiting `http://localhost:5000/` (for a simple message) or `http://localhost:5000/users` (to fetch users, if implemented).

## Services Details

### Client (React.js)

- **Location:** `client/`
- **Technology:** React.js
- **Purpose:** Provides the user interface. It communicates with the backend server to fetch and display data.
- **Key Files:**
    - `client/Dockerfile`: Defines how the React application is containerized.
    - `client/package.json`: Manages frontend dependencies and scripts.
    - `client/public/index.html`: The main HTML file served by the React application.
    - `client/src/index.js`: The entry point for the React application.
    - `client/src/App.js`: The main React component that fetches data from the server and renders it.

### Server (Node.js with Express)

- **Location:** `server/`
- **Technology:** Node.js, Express.js (web framework), `mysql2` (MySQL client library).
- **Purpose:** Acts as the API layer, handling requests from the client, processing them, and interacting with the database. It exposes endpoints like `/` and `/users`.
- **Key Files:**
    - `server/Dockerfile`: Defines how the Node.js application is containerized.
    - `server/package.json`: Manages backend dependencies.
    - `server/server.js`: The main server file, setting up Express, connecting to the MySQL database, and defining API routes.

### Database (MySQL)

- **Location:** `database/`
- **Technology:** MySQL 8.0
- **Purpose:** Stores application data. The server connects to this database.
- **Key Files:**
    - `database/Dockerfile`: Defines how the MySQL database is set up in a container. It copies the `schema.sql` file to initialize the database.
    - `database/schema.sql`: Contains SQL commands to create the database and necessary tables (e.g., `users` table). 