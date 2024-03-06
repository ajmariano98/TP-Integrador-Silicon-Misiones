const CartItems = require('../models/cartitemsmodel');


function getAllItemsByUserId(req, res) {
  const { user_id } = req.params;
  CartItems.getAllItemsByUserId(user_id, (error, results) => {
    if (error) {
      console.error('Error al obtener elementos del carrito:', error);
      res.status(500).json({ message: 'Error al obtener elementos del carrito' });
      return;
    }
    res.status(200).json(results);
  });
}


function addItemToCart(req, res) {
  const { user_id, product_id, quantity } = req.body;
  CartItems.addItemToCart(user_id, product_id, quantity, (error, results) => {
    if (error) {
      console.error('Error al agregar elemento al carrito:', error);
      res.status(500).json({ message: 'Error al agregar elemento al carrito' });
      return;
    }
    res.status(201).json({ message: 'Elemento agregado al carrito' });
  });
}


function updateCartItem(req, res) {
  const { cart_item_id } = req.params;
  const { quantity } = req.body;
  CartItems.updateCartItem(cart_item_id, quantity, (error, results) => {
    if (error) {
      console.error('Error al actualizar elemento del carrito:', error);
      res.status(500).json({ message: 'Error al actualizar elemento del carrito' });
      return;
    }
    res.status(200).json({ message: 'Elemento del carrito actualizado' });
  });
}


function deleteCartItem(req, res) {
  const { user_id } = req.params;
  CartItems.deleteCartItemsByUserId(user_id, (error, results) => {
    if (error) {
      console.error('Error al eliminar elementos del carrito:', error);
      res.status(500).json({ message: 'Error al eliminar elementos del carrito' });
      return;
    }
    res.status(200).json({ message: 'Elementos del carrito eliminados' });
  });
}


module.exports = {
  getAllItemsByUserId,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
};
