const db = require("../config/db");

class Athlete {
  constructor(data) {
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.nickname = data.nickname ?? null;
    this.birth_date = data.birth_date;
    this.weight = data.weight ?? null;
    this.image_url = data.image_url ?? null;
    this.sport = data.sport;
    this.achievements = data.achievements ?? null;
  }

  static findAll() {
    const sql = "SELECT * FROM athletes ORDER BY id";
    return db.execute(sql);
  }

  static findById(id) {
    const sql = "SELECT * FROM athletes WHERE id = ?";
    return db.execute(sql, [id]);
  }

  async save() {
    const sql = `
    INSERT INTO athletes
    (
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    return db.execute(sql, [
      this.first_name,
      this.last_name,
      this.nickname,
      this.birth_date,
      this.weight,
      this.image_url,
      this.sport,
      this.achievements,
    ]);
  }

  async update(id) {
    const sql = `
    UPDATE athletes
    SET
      first_name = ?,
      last_name = ?,
      nickname = ?,
      birth_date = ?,
      weight = ?,
      image_url = ?,
      sport = ?,
      achievements = ?
    WHERE id = ?
  `;

    return db.execute(sql, [
      this.first_name,
      this.last_name,
      this.nickname,
      this.birth_date,
      this.weight,
      this.image_url,
      this.sport,
      this.achievements,
      id,
    ]);
  }

  static delete(id) {
    const sql = "DELETE FROM athletes WHERE id = ?";
    return db.execute(sql, [id]);
  }
}

module.exports = Athlete;
