const ProductsModel = require('../models/productsmodel');


function getProductById(req, res) {
  const productId = req.params.product_id;

  ProductsModel.getProductById(productId, (err, product) => {
    if (err) {
      console.error('Error al obtener producto por ID:', err);
      res.status(500).json({ error: 'Error al obtener producto por ID' });
      return;
    }

    if (!product || Object.keys(product).length === 0) {
      res.status(404).json({ error: 'El producto no existe' });
      return;
    }

    res.json(product);
  });
}


function createProduct(req, res) {
  const { name, brand, category_id, price, photo, description } = req.body;


  if (!name || !brand || category_id === undefined || !price || !photo || !description) {
    res.status(400).json({ error: 'Faltan datos requeridos' });
    return;
  }


  ProductsModel.getProductByNameAndBrand(name, brand, (err, existingProduct) => {
    if (err) {
      console.error('Error al buscar producto:', err);
      res.status(500).json({ error: 'Error al buscar producto' });
      return;
    }

    if (existingProduct) {
      res.status(400).json({ error: 'El producto ya existe' });
      return;
    }


    ProductsModel.createProduct({ name, brand, category_id, price, photo, description }, (err, result) => {
      if (err) {
        console.error('Error al crear producto:', err);
        res.status(500).json({ error: 'Error al crear producto' });
        return;
      }
      res.json({ message: 'Producto creado exitosamente' });
    });
  });
}


function getAllProducts(req, res) {
  ProductsModel.getAllProducts((err, products) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).json({ error: 'Error al obtener productos' });
      return;
    }

    res.json(products);
  });
}


function updateProduct(req, res) {
  const productId = req.params.product_id;
  const productData = req.body;
  console.log('Product ID:', productId);
  console.log('Product Data:', productData);


  ProductsModel.getProductById(productId, (err, existingProduct) => {
    if (err) {
      console.error('Error al buscar producto por ID:', err);
      res.status(500).json({ error: 'Error al buscar producto por ID' });
      return;
    }

    if (!existingProduct || Object.keys(existingProduct).length === 0) {
      res.status(404).json({ error: 'El producto no existe' });
      return;
    }


    ProductsModel.updateProduct(productId, productData, (err) => {
      if (err) {
        console.error('Error al actualizar producto:', err);
        res.status(500).json({ error: 'Error al actualizar producto' });
        return;
      }
      res.json({ message: 'Producto actualizado exitosamente' });
    });
  });
}


function deleteProduct(req, res) {
  const productId = req.params.product_id;


  ProductsModel.getProductById(productId, (err, existingProduct) => {
    if (err) {
      console.error('Error al obtener producto por ID:', err);
      res.status(500).json({ error: 'Error al obtener producto por ID' });
      return;
    }

    if (!existingProduct || Object.keys(existingProduct).length === 0) {
      res.status(404).json({ error: 'El producto no existe' });
      return;
    }

    ProductsModel.deleteProduct(productId, (err) => {
      if (err) {
        console.error('Error al eliminar producto:', err);
        res.status(500).json({ error: 'Error al eliminar producto' });
        return;
      }

      res.json({ message: 'Producto eliminado exitosamente' });
    });
  });
}

function searchProductsByNameAndCategory(req, res) {
  const { name, category } = req.query;
  const searchTerm = `%${name}%`;
  const categoryId = category || null;

  ProductsModel.searchProductsByNameAndCategory(searchTerm, categoryId, (err, products) => {
    if (err) {
      console.error('Error al buscar productos por nombre y categoría:', err);
      res.status(500).json({ error: 'Error al buscar productos por nombre y categoría' });
      return;
    }

    res.json(products);
  });
}

module.exports = {
  getProductById,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  searchProductsByNameAndCategory,
};
