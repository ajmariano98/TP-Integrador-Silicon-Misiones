const express = require('express');
const app = express();
const cors = require('cors')

const mysql = require('mysql');
const config = require('./config.json');

const db = mysql.createConnection(config.database);

const morgan = require('morgan');

app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms')

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('App.js: Conexión exitosa a la base de datos');
  }
});

app.use(express.json());
app.use(cors())

const UsersController = require('./controllers/userscontroller');
const ProductsController = require('./controllers/productscontroller');
const CategoryController = require('./controllers/categorycontroller');
const Login = require('./controllers/securitycontroller');
const cartItemsController = require('./controllers/cartitemscontroller');


app.get('/users/:username', UsersController.getUserByUsername);
app.get('/userslist', UsersController.getAllUsers);
app.post('/users', UsersController.createUser); 
app.put('/users/:username', UsersController.updateUser); 
app.delete('/listusers/:user_id', UsersController.deleteUserById); 
app.delete('/users/:username', UsersController.deleteUser); 


app.get('/products/:product_id', ProductsController.getProductById); 
app.get('/productslist', ProductsController.getAllProducts); 
app.post('/registerproducts', ProductsController.createProduct); 
app.put('/products/:product_id', ProductsController.updateProduct); 
app.delete('/products/:product_id', ProductsController.deleteProduct); 

app.get('/productslist/category/:category_id', (req, res) => {
  const { category_id } = req.params;
  const query = 'SELECT * FROM Products WHERE category_id = ?';
  db.query(query, [category_id], (error, results) => {
    if (error) {
      console.error('Error al obtener productos filtrados por categoría', error);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
});

app.get('/search', ProductsController.searchProductsByNameAndCategory);


app.get('/categorieslist', CategoryController.getAllCategories);
app.get('/categories/:category_id', CategoryController.getCategoryById); 
app.post('/categories', CategoryController.createCategory); 
app.put('/categories/:category_id', CategoryController.updateCategory); 
app.delete('/categories/:category_id', CategoryController.deleteCategory); 

app.post('/login', Login.login);


app.get('/cart/:user_id', cartItemsController.getAllItemsByUserId);
app.post('/cart', cartItemsController.addItemToCart);
app.put('/cart/:cart_item_id', cartItemsController.updateCartItem);
app.delete('/cart/:user_id', cartItemsController.deleteCartItem);


const PORT = config.server.port || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

