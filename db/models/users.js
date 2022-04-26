const {client} = require("../client");
const bcrypt = require("bcrypt");
//const { rows } = require("pg/lib/defaults");
async function getAllUsers() {
  try {
    const {
      rows: [user],
    } = await client.query(`
  SELECT * FROM users
  RETURNING *;
  `);
    return user;
  } catch (error) {
    throw error;
  }
}
async function createUser({ username, password, email }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {rows: [user]} = await client.query(`
      INSERT INTO users(username, password,email)
      VALUES($1,$2,$3)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
      `,[username, password, email]);
    delete user.hashedPassword;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users WHERE username=$1;
      `,
      [username]
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE id=$1`, [id]);
    if (!user) return null;
    delete user.password;
    delete user.hashedPassword;
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUser({ username, password }) {
  try {
    let user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      delete user.password;
      return user;
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
  getUserById,
  getUser,
};
