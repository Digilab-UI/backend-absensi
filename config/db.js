const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

let dbPromise;

async function getDb() {
  if (!dbPromise) {
    dbPromise = sqlite.open({
      filename: './contacts.db',
      driver: sqlite3.Database
    });
  }
  return dbPromise;
}

module.exports = {
  all: async (query, params = []) => {
    const db = await getDb();
    return db.all(query, params);
  },
  run: async (query, params = []) => {
    const db = await getDb();
    return db.run(query, params);
  }
};
