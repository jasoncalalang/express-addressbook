const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Create a connection pool to your MySQL database
const pool = mysql.createPool({
  host: 'sql.intranet.cspb.edu.ph',
  user: 'testuser',
  password: 'testpassword',
  database: 'testdb'
});

// Middleware to parse JSON bodies
app.use(express.json());

// CREATE: Add a new contact
app.post('/contacts', (req, res) => {
  const { first_name, last_name, phone, email, address } = req.body;
  pool.query(
    'INSERT INTO contacts (first_name, last_name, phone, email, address) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, phone, email, address],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Contact created', contactId: results.insertId });
    }
  );
});

// READ: Get all contacts
app.get('/contacts', (req, res) => {
  pool.query('SELECT * FROM contacts', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// READ: Get a single contact by id
app.get('/contacts/:id', (req, res) => {
  const contactId = req.params.id;
  pool.query('SELECT * FROM contacts WHERE id = ?', [contactId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(results[0]);
  });
});

// UPDATE: Update a contact by id
app.put('/contacts/:id', (req, res) => {
  const contactId = req.params.id;
  const { first_name, last_name, phone, email, address } = req.body;
  pool.query(
    'UPDATE contacts SET first_name = ?, last_name = ?, phone = ?, email = ?, address = ? WHERE id = ?',
    [first_name, last_name, phone, email, address, contactId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.json({ message: 'Contact updated' });
    }
  );
});

// DELETE: Remove a contact by id
app.delete('/contacts/:id', (req, res) => {
  const contactId = req.params.id;
  pool.query('DELETE FROM contacts WHERE id = ?', [contactId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

