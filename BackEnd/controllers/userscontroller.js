const UsersModel = require('../models/usersmodel');


function getUserByUsername(req, res) {
  const username = req.params.username;


  UsersModel.getUserByUsername(username, (err, user) => {
    if (err) {
      console.error('Error al obtener usuario por username:', err);
      res.status(500).json({ error: 'Error al obtener usuario por username' });
      return;
    }

    if (!user || Object.keys(user).length === 0) {
      res.status(404).json({ error: 'El usuario no existe' });
      return;
    }

    res.json(user);
  });
}


function createUser(req, res) {
  const { email, username, password } = req.body;


  if (!email || !username || !password) {
    res.status(400).json({ error: 'Faltan datos requeridos' });
    return;
  }


  UsersModel.getUserByUsername(username, (err, existingUser) => {
    if (err) {
      console.error('Error al buscar usuario por username:', err);
      res.status(500).json({ error: 'Error al buscar usuario por username' });
      return;
    }

    if (existingUser) {
      res.status(400).json({ error: 'El usuario ya existe' });
      return;
    }


    UsersModel.createUser({ email, username, password }, (err, result) => {
      if (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).json({ error: 'Error al crear usuario' });
        return;
      }
      res.json({ message: 'Usuario creado exitosamente' });
    });
  });
}


function getAllUsers(req, res) {
  UsersModel.getAllUsers((err, users) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
      return;
    }
    res.json(users);
  });
}


function updateUser(req, res) {
  const username = req.params.username;
  const { email, password } = req.body;


  UsersModel.getUserByUsername(username, (err, existingUser) => {
    if (err) {
      console.error('Error al buscar usuario por username:', err);
      res.status(500).json({ error: 'Error al buscar usuario por username' });
      return;
    }

    if (!existingUser || Object.keys(existingUser).length === 0) {
      res.status(404).json({ error: 'El usuario no existe' });
      return;
    }


    UsersModel.updateUser({ email, username, password }, (err) => {
      if (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).json({ error: 'Error al actualizar usuario' });
        return;
      }
      res.json({ message: 'Usuario actualizado exitosamente' });
    });
  });
}


function deleteUser(req, res) {
  const username = req.params.username;


  UsersModel.getUserByUsername(username, (err, existingUser) => {
    if (err) {
      console.error('Error al buscar usuario por username:', err);
      res.status(500).json({ error: 'Error al buscar usuario por username' });
      return;
    }

    if (!existingUser || Object.keys(existingUser).length === 0) {
      res.status(404).json({ error: 'El usuario no existe' });
      return;
    }


    UsersModel.deleteUser(username, (err) => {
      if (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).json({ error: 'Error al eliminar usuario' });
        return;
      }
      res.json({ message: 'Usuario eliminado exitosamente' });
    });
  });
}

function deleteUserById(req, res) {
  const user_id = req.params.user_id;


  UsersModel.getUserById(user_id, (err, existingUser) => {
    if (err) {
      console.error('Error al buscar usuario por ID:', err);
      res.status(500).json({ error: 'Error al buscar usuario por ID' });
      return;
    }

    if (!existingUser || Object.keys(existingUser).length === 0) {
      res.status(404).json({ error: 'El usuario no existe' });
      return;
    }


    UsersModel.deleteUserById(user_id, (err) => {
      if (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).json({ error: 'Error al eliminar usuario' });
        return;
      }
      res.json({ message: 'Usuario eliminado exitosamente' });
    });
  });
}


module.exports = {
  getUserByUsername,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteUserById
};