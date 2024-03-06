const mysql = require('mysql');
const config = require('../config.json');

const db = mysql.createConnection(config.database);

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Categorías: Conexión exitosa a la base de datos');
  }
});


function getAllCategories(callback) {
  db.query('SELECT category_id, category_name FROM Category', callback);
}


function getCategoryByName(categoryName, callback) {
    db.query('SELECT category_id, category_name FROM Category WHERE category_name = ?', [categoryName], (err, result) => {
      if (err) {
        callback(err, null);
      } else if (result.length === 0) {
        callback(null, null); 
      } else {
        callback(null, result[0]); 
      }
    });
  }

  

function getCategoryById(category_id, callback) {
  db.query('SELECT category_id, category_name FROM Category WHERE category_id = ?', [category_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.length === 0) {
      callback(null, null);
    } else {
      callback(null, result[0]); 
    }
  });
}


function createCategory(category, callback) {
  db.query('INSERT INTO Category (category_name) VALUES (?)', [category.category_name], callback);
}


function updateCategory(category_id, categoryData, callback) {
  db.query(
    'UPDATE Category SET category_name = ? WHERE category_id = ?',
    [categoryData.category_name, category_id],
    callback
  );
}

function getProductsCountInCategory(category_id, callback) {
  db.query('SELECT COUNT(*) AS productCount FROM products WHERE category_id = ?', [category_id], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    // El resultado contiene un campo "productCount" que indica cuántos productos usan la categoría
    const productCount = results[0].productCount;
    callback(null, productCount);
  });
}

function deleteCategory(category_id, callback) {
  db.query('DELETE FROM Category WHERE category_id = ?', [category_id], callback);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryByName,
  getProductsCountInCategory
};
