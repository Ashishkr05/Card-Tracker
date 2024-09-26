# Card Tracker

**Card Tracker** is a Node.js-based API designed to track the status of cards (e.g., pickups, deliveries, exceptions, and returns). The API processes data from CSV files and provides an endpoint to retrieve the current status of a card based on a user’s phone number or card ID.

## Tools Used

- **Node.js** (v20.12.2)
- **Express.js** for building the web server
- **MongoDB** for storing card status data
- **MongoDB Compass** for database management

## Project Overview

The CARDTracker API is built with a focus on scalability and flexibility. The architecture is designed to efficiently process and retrieve card status information using a priority-based system. 

### Why These Technologies?

- **Node.js**: Chosen for its non-blocking, event-driven architecture, which is ideal for handling multiple requests simultaneously.
- **Express.js**: A minimal web framework for Node.js that simplifies the process of building APIs.
- **MongoDB**: A NoSQL database that allows for flexible schema design and rapid data retrieval.

## Features Implemented

- **CSV Data Processing**: Imports and processes CSV files containing card status data.
- **MongoDB Integration**: Card statuses are stored in a MongoDB database for fast retrieval.
- **Priority-Based Status Retrieval**: Card statuses are prioritized to always return the most relevant status.
- **User-Friendly Queries**: The API allows users to query the card status using either their phone number or card ID.
- **Error Handling**: Detailed error messages are provided for invalid inputs or when no matching card status is found.
- **Docker Support**: The API is containerized using Docker for easy deployment.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js (v20.12.2)**
- **MongoDB Compass** (for managing the database)
- **Docker** (optional, for containerization)

## Dependencies

The following libraries are used in this project:

- **express**: ^4.21.0 - A minimal web framework for Node.js.
- **mongoose**: ^8.6.3 - MongoDB object modeling for Node.js.
- **csv-parser**: ^3.0.0 - A streaming CSV parser for Node.js.
- **moment**: ^2.30.1 - A library for parsing, validating, and manipulating dates.
- **dotenv**: ^16.4.5 - A module to load environment variables from a `.env` file.
- **mongodb**: ^6.9.0 - MongoDB driver for Node.js.

### Installation

1. Unzip the project files or clone the repository.
2. Open a terminal and navigate to the project directory.
3. Initialize a new Node.js project (if not already done):
```bash
   npm init -y
```
4. Make sure to replace the MongoDB URL in .env file if you're using a different configuration.
5. To install the necessary dependencies, run:
```bash
npm install express mongoose csv-parser moment dotenv mongodb
```
6. To start the application, run:
```bash
    node server.js
```
## API Endpoints

### GET /get_card_status

Retrieves the current card status based on either the phone number or card ID.

#### Query Parameters:

- **phone** (optional): User's phone number.
- **cardID** (optional): Card ID.

#### Example Requests:

1. Retrieve status by phone number and card id:
```bash
   curl "http://localhost:3000/get_card_status?phone=585949014"
   curl "http://localhost:3000/get_card_status?cardID=ZYW8827"
```
# API Response Example

Here is an example of the response you might receive:

```json
{
    "_id": "66efcfccd38512fb3d8501f9",
    "cardID": "ZYW8827",
    "userMobile": "\"0585949014\"",
    "timestamp": "2023-11-13T09:34:56.000Z",
    "status": "DELIVERED",
    "comment": "DELIVERED",
    "__v": 0
}
```
### Not valid API

If the API is queried with no parameters or not valid parameters.

```json
{
    "error": "Please provide a phone number or card ID."
}
```

### No Status Found Handling

If the API is queried with valid parameters (phone number or card ID) but no corresponding status is found in the database, it will return a `404` error with a specific message.

#### Example Response:

```json
{
    "message": "No status found for the provided information."
}
```
## Possible Improvements

- **Enhanced Input Validation**: Implement more robust input validation for phone numbers and card IDs.
- **Authentication**: Add authentication mechanisms for secure access to the API.
- **Rate Limiting**: Introduce rate limiting to prevent abuse of the API.
- **Comprehensive Logging**: Implement logging for better monitoring and debugging.

## Docker Support

To run the CARDTracker API using Docker, follow these steps:

### Prerequisites

- **Docker**
- **Docker Compose**

1. **Build the Docker Image:**
```bash
   docker build -t cardtracker-api .
```
2. **Run the Docker Container:** To run the container, use the following command, ensuring that the MongoDB URI is correctly set:
```bash
   docker run -p 3001:3000 -e MONGO_URI=mongodb://host.docker.internal:27017/card_status_db cardtracker-api

```
3. **Access the API:** The API will be accessible at http://localhost:3001

## Conclusion

CARDTracker is a simple yet robust API for tracking card statuses, designed with scalability and flexibility in mind. Its priority-based status system ensures that users always receive the most relevant card status for their queries.

[Card_Tracker_project_presentation.pdf](https://github.com/user-attachments/files/17145404/Card_Tracker_project_presentation.pdf)
