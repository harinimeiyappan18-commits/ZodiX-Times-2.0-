import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("./zodix.db");

db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    type TEXT,
    source TEXT,
    status TEXT,
    originality INTEGER,
    authorId INTEGER
  )
`);

});

