const mysql = require('mysql');
const config = require('../config.json');

const db = mysql.createConnection(config.database);

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Carrito: Conexión exitosa a la base de datos');
  }
});

const CartItems = {};


CartItems.getAllItemsByUserId = (user_id, callback) => {
  db.query(
    'SELECT ci.cart_item_id, ci.quantity, p.product_id, p.photo, p.name, p.brand, p.category_id, p.price ' +
    'FROM CartItems ci ' +
    'INNER JOIN Products p ON ci.product_id = p.product_id ' +
    'WHERE ci.user_id = ?',
    [user_id],
    (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, results);
    }
  );
};


CartItems.addItemToCart = (user_id, product_id, quantity, callback) => {
  db.query(
    'INSERT INTO CartItems (user_id, product_id, quantity) VALUES (?, ?, ?)',
    [user_id, product_id, quantity],
    (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, results);
    }
  );
};

CartItems.updateCartItem = (cart_item_id, quantity, callback) => {
  db.query(
    'UPDATE CartItems SET quantity = ? WHERE cart_item_id = ?',
    [quantity, cart_item_id],
    (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, results);
    }
  );
};


CartItems.deleteCartItem = (cart_item_id, callback) => {
  db.query(
    'DELETE FROM CartItems WHERE cart_item_id = ?',
    [cart_item_id],
    (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, results);
    }
  );
};

CartItems.deleteCartItemsByUserId = (user_id, callback) => {
  db.query('DELETE FROM CartItems WHERE user_id = ?', [user_id], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
};


module.exports = CartItems;