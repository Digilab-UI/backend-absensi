# Contact Backend

A simple Node.js backend for managing contacts. Includes Docker and Docker Compose setup.

## Features
- RESTful API for contacts
- SQLite database (`contacts.db`)
- Dockerized for easy deployment

## Getting Started

### Prerequisites
- Node.js
- Docker & Docker Compose

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node app.js
   ```

### Using Docker
1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```
2. The app will be available at `http://localhost:3000`

## Project Structure
```
app.js
contacts.db
package.json
seed.js
config/
  db.js
controllers/
  contactsController.js
routes/
  contacts.js
```

## API Endpoints
- `GET /contacts` - List all contacts
- `POST /contacts` - Add a new contact
- `PUT /contacts/:id` - Update a contact
- `DELETE /contacts/:id` - Delete a contact

## License
MIT
