const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Create a connection pool to your MySQL database
const pool = mysql.createPool({
  host: 'sql.intranet.cspb.edu.ph',
  user: 'testuser',
  password: 'testpassword',
  database: 'testdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// Middleware to parse JSON requests
app.use(express.json());

// CREATE: Add a new contact
app.post('/contacts', async (req, res) => {
  try {
    const { first_name, last_name, phone, email, address } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO contacts (first_name, last_name, phone, email, address) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, phone, email, address]
    );
    res.status(201).json({ message: 'Contact created', contactId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// READ: Get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contacts');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// READ: Get a single contact by ID
app.get('/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const [rows] = await pool.execute('SELECT * FROM contacts WHERE id = ?', [contactId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// UPDATE: Update a contact by ID
app.put('/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const { first_name, last_name, phone, email, address } = req.body;

    const [result] = await pool.execute(
      'UPDATE contacts SET first_name = ?, last_name = ?, phone = ?, email = ?, address = ? WHERE id = ?',
      [first_name, last_name, phone, email, address, contactId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE: Remove a contact by ID
app.delete('/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const [result] = await pool.execute('DELETE FROM contacts WHERE id = ?', [contactId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

