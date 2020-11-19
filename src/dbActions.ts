import { db } from './db';
import { Row } from './types';

export class DBActions {
  constructor() {

  }

  // Creating score table in DB
  async createScoreTable() {
    db.serialize(() => {
      db.run<String>('CREATE TABLE scores (id TEXT PRIMARY KEY, score INT, createdAt INT)');
    });

    db.close();
  }

  // Get score with specific ID
  getScore(id) {
    return new Promise((res, rej) => {
      const sql = <String>'SELECT * FROM scores WHERE id = ?';
      db.all(sql, [id], (err, rows) => {
        if(!!err) rej(err);
        res(rows);
      });
    });
  }

  // Get all scores
  async getAllScores() {
    return new Promise((res, rej) => {
      const sql = <String>'SELECT * FROM scores';
      db.all(sql, [], (err, rows) => {
        if(!!err) rej(err);
        res(rows);
      });
    });
  }

  // Add a score
  addScore(scoreObj) {
    const stmt = db.prepare<String>('INSERT INTO scores (id, score, createdAt) VALUES (?, ?, ?)');
    stmt.run([
      scoreObj.id,
      scoreObj.score,
      new Date().getTime()
    ]);
  }

  // Delete score with specific ID
  deleteScore(id) {
    const stmt = db.prepare<String>('DELETE * FROM scores WHERE id = ?');
    stmt.run([id]);
  }

  // Delete all scores in tabel
  deleteAllScores() {
    db.run<String>('DELETE * FROM scores');
  }
}