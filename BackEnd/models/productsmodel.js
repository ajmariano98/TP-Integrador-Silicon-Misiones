const mysql = require('mysql');
const config = require('../config.json');

const db = mysql.createConnection(config.database);

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Productos: Conexión exitosa a la base de datos');
  }
});

function getProductById(product_id, callback) {
  db.query('SELECT product_id, name, brand, category_id, price, photo, description FROM products WHERE product_id = ?', [product_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.length === 0) {
      callback(null, null); 
    } else {
      callback(null, result[0]); 
    }
  });
}


function getProductByNameAndBrand(name, brand, callback) {
    db.query('SELECT product_id FROM products WHERE name = ? AND brand = ?', [name, brand], (err, result) => {
      if (err) {
        callback(err, null);
      } else if (result.length === 0) {
        callback(null, null); 
      } else {
        callback(null, result[0]);
      }
    });
  }
  

  function createProduct(product, callback) {
    getProductByNameAndBrand(product.name, product.brand, (err, existingProduct) => {
      if (err) {
        callback(err, null);
      } else if (existingProduct) {
        callback({ message: 'El producto ya existe' }, null);
      } else {
        db.query('INSERT INTO products (name, brand, category_id, price, photo, description) VALUES (?, ?, ?, ?, ?, ?)', [product.name, product.brand, product.category_id, product.price, product.photo, product.description], callback);
      }
    });
  }


function getAllProducts(callback) {
    db.query('SELECT product_id, name, brand, category_id, price, photo, description FROM products', callback);
}

function updateProduct(productId, productData, callback) {
    db.query(
      'UPDATE Products SET name = ?, brand = ?, category_id = ?, price = ?, photo = ?, description = ? WHERE product_id = ?',
      [productData.name, productData.brand, productData.category_id, productData.price, productData.photo, productData.description, productId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else if (result.affectedRows === 0) {
          callback({ message: 'El producto no existe' }, null);
        } else {
          callback(null, result);
        }
      }
    );
  }

function deleteProduct(product_id, callback) {
    getProductById(product_id, (err, existingProduct) => {
        if (err) {
          callback(err, null);
        } else if (!existingProduct) {
          callback({ message: 'El producto no existe' }, null); 
        } else {
          db.query('DELETE FROM products WHERE product_id = ?', [product_id], callback);
        }
      });
}

function searchProductsByNameAndCategory(searchTerm, categoryId, callback) {
  db.query(
    'SELECT product_id, name, brand, category_id, price, photo, description FROM products WHERE (name LIKE ? OR brand LIKE ? OR description LIKE ?) AND (? IS NULL OR category_id = ?)',
    [searchTerm, searchTerm, searchTerm, categoryId, categoryId],
    callback
  );
}




module.exports = {
  getProductById,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductByNameAndBrand,
  searchProductsByNameAndCategory
};
