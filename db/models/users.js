// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUser
};

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
  const {rows:[user]}=await client.query(`
  SELECT * FROM users
  RETURNING *;
  `)
  return user;
  } catch (error) {
    throw error;
  }
}
async function createUser({username, password, email}){
  try {
    const SALT_COUNT=10;
    const hashedPassword=await bcrypt.hash(password,SALT_COUNT);
    const {rows:[user]}=await client.query(`
    INSERT INTO users(username, password,email)
    VALUES($1,$2,$3)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,[username,hashedPassword,email]);
    delete user.hashedPassword;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserByUsername(username) {
  try {
      const {rows: [user]} = await client.query(`
      SELECT * FROM users WHERE username=$1;
      `, [username]);
      if (!user) {
          return null;
      }
      return user;
  } catch (error) {
      throw error;
  }
}
async function getUser({username,password}){
  try {
    let user=await getUserByUsername(username);
  const hashedPassword=user.password;
  const passwordMatch=await bcrypt.compare(password,hashedPassword)
  if(passwordMatch){
    delete user.password;
    return user;
  }else{
    return;
  } 
  } catch (error) {
    throw error;
  }
}

//getUser