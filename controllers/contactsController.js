const db = require('../config/db');

exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await db.all('SELECT rfid_tag, nickname FROM contacts');
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};
