# Node.js TypeScript Server

This is a Node.js server written in TypeScript. It provides various endpoints for managing timers, notifications, authentication, and file uploads.

## Getting Started

### Prerequisites

Before running the server, ensure that you have the following dependencies installed:

- Node.js (Version 14.17.0) *(optional, only for development or debugging)*
- Docker 

### Installation
1. Clone the repository:
2. Build and run the Docker containers:
```docker
docker-compose up
```
## API Endpoints



The following API endpoints are available:

| Method | URL                         | Description                            |
| ------ | --------------------------- | -------------------------------------- |
| GET    | /timer                      | Get all timers                          |
| GET    | /timer/:id                  | Get a specific timer by ID              |
| POST   | /timer                      | Create a new timer                      |
| PUT    | /timer/:id                  | Update a timer by ID                    |
| DELETE | /timer/:id                  | Delete a timer by ID                    |
| GET    | /notification               | Get all notifications                   |
| GET    | /notification/:id           | Get a specific notification by ID       |
| POST   | /notification               | Create a new notification               |
| PUT    | /notification/:id           | Update a notification by ID             |
| DELETE | /notification/:id           | Delete a notification by ID             |
| POST   | /auth/login                 | Authenticate a user and get a JWT token |
| POST   | /upload                     | Upload a file                           |
| GET    | /health                     | Check server health  
