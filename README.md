# Express Address Book API

This project is a simple Express application that provides a CRUD API to manage contacts stored in a MySQL database.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure your MySQL connection in `app.js` if needed.
3. Start the server:
   ```bash
   node app.js
   ```

## API Endpoints

### Create a New Contact
- **Endpoint:** POST `/contacts`
- **Payload Example:**
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "phone": "1234567890",
    "email": "john@example.com",
    "address": "123 Main St"
  }
  ```
- **Test with curl:**
  ```bash
  curl -X POST http://localhost:3000/contacts \
       -H "Content-Type: application/json" \
       -d '{"first_name": "John", "last_name": "Doe", "phone": "1234567890", "email": "john@example.com", "address": "123 Main St"}'
  ```

### Get All Contacts
- **Endpoint:** GET `/contacts`
- **Test with curl:**
  ```bash
  curl http://localhost:3000/contacts
  ```

### Get a Single Contact
- **Endpoint:** GET `/contacts/:id`
- **Test with curl:**
  ```bash
  curl http://localhost:3000/contacts/1
  ```

### Update a Contact
- **Endpoint:** PUT `/contacts/:id`
- **Payload Example:**
  ```json
  {
    "first_name": "Jane",
    "last_name": "Doe",
    "phone": "0987654321",
    "email": "jane@example.com",
    "address": "321 Main St"
  }
  ```
- **Test with curl:**
  ```bash
  curl -X PUT http://localhost:3000/contacts/1 \
       -H "Content-Type: application/json" \
       -d '{"first_name": "Jane", "last_name": "Doe", "phone": "0987654321", "email": "jane@example.com", "address": "321 Main St"}'
  ```

### Delete a Contact
- **Endpoint:** DELETE `/contacts/:id`
- **Test with curl:**
  ```bash
  curl -X DELETE http://localhost:3000/contacts/1
  ```

## Notes

- Replace `localhost:3000` with your actual server address and port if different.
- Ensure your MySQL database is set up and the `contacts` table exists as expected.
