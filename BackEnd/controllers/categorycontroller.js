const CategoryModel = require('../models/categorymodel');


function getAllCategories(req, res) {
  CategoryModel.getAllCategories((err, categories) => {
    if (err) {
      console.error('Error al obtener categorías:', err);
      res.status(500).json({ error: 'Error al obtener categorías' });
      return;
    }

    res.json(categories);
  });
}


function getCategoryById(req, res) {
  const category_id = req.params.category_id;
  CategoryModel.getCategoryById(category_id, (err, category) => {
    if (err) {
      console.error('Error al obtener categoría por ID:', err);
      res.status(500).json({ error: 'Error al obtener categoría por ID' });
      return;
    }

    if (!category || Object.keys(category).length === 0) {
      res.status(404).json({ error: 'La categoría no existe' });
      return;
    }

    res.json(category);
  });
}


function createCategory(req, res) {
  const { category_name } = req.body;

  if (!category_name) {
    res.status(400).json({ error: 'Faltan datos requeridos' });
    return;
  }


  CategoryModel.getCategoryByName(category_name, (err, existingCategory) => {
    if (err) {
      console.error('Error al buscar la categoría:', err);
      res.status(500).json({ error: 'Error al buscar la categoría' });
      return;
    }

    if (existingCategory) {
      res.status(400).json({ error: 'La categoría ya existe' });
      return;
    }

    CategoryModel.createCategory({ category_name }, (err, result) => {
      if (err) {
        console.error('Error al crear categoría:', err);
        res.status(500).json({ error: 'Error al crear categoría' });
        return;
      }
      res.json({ message: 'Categoría creada exitosamente' });
    });
  });
}


function updateCategory(req, res) {
  const category_id = req.params.category_id;
  const { category_name } = req.body;

  if (!category_name) {
    res.status(400).json({ error: 'Faltan datos requeridos' });
    return;
  }


  CategoryModel.getCategoryById(category_id, (err, existingCategory) => {
    if (err) {
      console.error('Error al buscar la categoría por ID:', err);
      res.status(500).json({ error: 'Error al buscar la categoría por ID' });
      return;
    }

    if (!existingCategory) {
      res.status(404).json({ error: 'La categoría no existe' });
      return;
    }

    CategoryModel.updateCategory(category_id, { category_name }, (err) => {
      if (err) {
        console.error('Error al actualizar categoría:', err);
        res.status(500).json({ error: 'Error al actualizar categoría' });
        return;
      }
      res.json({ message: 'Categoría actualizada exitosamente' });
    });
  });
}


function deleteCategory(req, res) {
  const category_id = req.params.category_id;

  CategoryModel.getCategoryById(category_id, (err, existingCategory) => {
    if (err) {
      console.error('Error al buscar la categoría por ID:', err);
      res.status(500).json({ error: 'Error al buscar la categoría por ID' });
      return;
    }

    if (!existingCategory) {
      res.status(404).json({ error: 'La categoría no existe' });
      return;
    }

    CategoryModel.getProductsCountInCategory(category_id, (err, productCount) => {
      if (err) {
        console.error('Error al contar productos en la categoría:', err);
        res.status(500).json({ error: 'Error al verificar si la categoría está en uso' });
        return;
      }

      if (productCount > 0) {
        // La categoría está en uso
        res.status(400).json({ error: 'No se puede eliminar la categoría, está en uso' });
        return;
      }

      // Si el recuento de productos es 0, procedemos a eliminar la categoría
      CategoryModel.deleteCategory(category_id, (err) => {
        if (err) {
          console.error('Error al eliminar categoría:', err);
          res.status(500).json({ error: 'Error al eliminar categoría' });
          return;
        }

        res.json({ message: 'Categoría eliminada exitosamente' });
      });
    });
  });
}




module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
