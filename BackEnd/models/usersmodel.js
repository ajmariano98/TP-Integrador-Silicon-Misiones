
const mysql = require('mysql');
const config = require('../config.json');
const bcrypt = require('bcrypt');


const db = mysql.createConnection(config.database);

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Usuarios: Conexión exitosa a la base de datos');
  }
});


function getUserByUsername(username, callback) {
  db.query('SELECT user_id, username, email, password, rol_id FROM users WHERE username = ?', [username], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.length === 0) {
      callback(null, null); 
    } else {
      callback(null, result[0]); 
    }
  });
}




function createUser(user, callback) {
  let passwordHashed = bcrypt.hashSync(user.password, 10)
  getUserByUsername(user.username, (err, existingUser) => {
    if (err) {
      callback(err, null);
    } else if (existingUser) {
      callback({ message: 'El usuario ya existe' }, null);
    } else {
      db.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [user.email, user.username, passwordHashed], callback);
    }
  });
}


function getAllUsers(callback) {
  db.query(
    'SELECT u.user_id, u.username, u.email, u.password, r.rol_name ' +
    'FROM users u ' +
    'JOIN Rol r ON u.rol_id = r.rol_id',
    callback
  );
}


function updateUser(user, callback) {
  let passwordHashed = bcrypt.hashSync(user.password, 10)
  getUserByUsername(user.username, (err, existingUser) => {
    if (err) {
      callback(err, null);
    } else if (!existingUser) {
      callback({ message: 'El usuario no existe' }, null); 
    } else {
      db.query('UPDATE users SET email = ?, password = ? WHERE username = ?', [user.email, passwordHashed, user.username], callback);
    }
  });
}


function deleteUser(username, callback) {
  getUserByUsername(username, (err, existingUser) => {
    if (err) {
      callback(err, null);
    } else if (!existingUser) {
      callback({ message: 'El usuario no existe' }, null);
    } else {
      db.query('DELETE FROM users WHERE username = ?', [username], callback);
    }
  });
}

function getUserById(user_id, callback) {
  db.query('SELECT user_id, username, email, password, rol_id FROM users WHERE user_id = ?', [user_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.length === 0) {
      callback(null, null); 
    } else {
      callback(null, result[0]); 
    }
  });
}

function deleteUserById(user_id, callback) {
  getUserById(user_id, (err, existingUser) => {
    if (err) {
      callback(err, null);
    } else if (!existingUser) {
      callback({ message: 'El usuario no existe' }, null);
    } else {
      db.query('DELETE FROM users WHERE user_id = ?', [user_id], callback);
    }
  });
}



module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
  deleteUserById
};