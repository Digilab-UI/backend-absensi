const db = require('./config/db');

async function seed() {
	await db.run(`CREATE TABLE IF NOT EXISTS contacts (
		rfid_tag TEXT PRIMARY KEY,
		nickname TEXT NOT NULL
	)`);
	await db.run('INSERT OR IGNORE INTO contacts (rfid_tag, nickname) VALUES (?, ?)', ['04:AB:12:CD', 'Alice']);
	await db.run('INSERT OR IGNORE INTO contacts (rfid_tag, nickname) VALUES (?, ?)', ['11:22:33:44', 'Bob']);
	console.log('Database seeded!');
}

seed();
