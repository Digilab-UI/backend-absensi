
const db = require('../config/db');
const validator = require('validator');


exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await db.all('SELECT rfid_tag, nickname FROM contacts');
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

exports.addContacts = async (req, res, next) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Request body must be an array.' });
    }
    const results = [];
    for (const contact of req.body) {
      // Basic validation
      if (
        !contact.rfid_tag ||
        !contact.nickname ||
        typeof contact.rfid_tag !== 'string' ||
        typeof contact.nickname !== 'string' ||
        contact.rfid_tag.length > 32 ||
        contact.nickname.length > 64 ||
        !validator.isAlphanumeric(contact.rfid_tag.replace(/:/g, ''))
      ) {
        results.push({ rfid_tag: contact.rfid_tag, status: 'invalid' });
        continue;
      }
      // Check for duplicate
      const existing = await db.all('SELECT rfid_tag FROM contacts WHERE rfid_tag = ?', [contact.rfid_tag]);
      if (existing.length > 0) {
        results.push({ rfid_tag: contact.rfid_tag, status: 'duplicate' });
        continue;
      }
      // Insert
      await db.run('INSERT INTO contacts (rfid_tag, nickname) VALUES (?, ?)', [contact.rfid_tag, contact.nickname]);
      results.push({ rfid_tag: contact.rfid_tag, status: 'added' });
    }
    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
};
