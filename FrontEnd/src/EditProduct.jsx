import React, { useState, useEffect } from 'react';
import './styles/EditProduct.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditProduct({ product_id, onClose }) {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const loadCategories = () => {
    fetch('http://localhost:8080/categorieslist')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error al cargar las categorías', error);
      });
  };

  useEffect(() => {

    fetch(`http://localhost:8080/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        loadCategories();
      })
      .catch((error) => {
        console.error('Error al cargar el producto', error);
      });
  }, [product_id]);

  const updateProduct = () => {

    if (!product.name || !product.brand || !product.category_id || !product.price || !product.photo || !product.description) {
      toast.error('Por favor, complete todos los campos antes de guardar.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
  
    const updatedProduct = {
      name: product.name,
      brand: product.brand,
      category_id: product.category_id,
      price: parseFloat(product.price),
      photo: product.photo,
      description: product.description,
    };
  
    fetch(`http://localhost:8080/products/${product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          // Muestra una notificación de éxito
          console.log('Producto actualizado exitosamente', data.message);
          toast.success('Producto actualizado exitosamente.', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          onClose();
        } else if (data.error) {
          console.error('Error al actualizar el producto', data.error);
        }
      });
  };
  

  return (
    <div id='edit-product-form' className='rounded'>
      <h2>Editar Producto</h2>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          value={product.name}
          onChange={(event) => {
            setProduct({ ...product, name: event.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label>Marca:</label>
        <input
          type="text"
          value={product.brand}
          required
          onChange={(event) => {
            setProduct({ ...product, brand: event.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label>Categoría:</label>
        <select
          className="form-select"
          name="category_id"
          value={product.category_id}
          required
          onChange={(event) => {
            setProduct({ ...product, category_id: event.target.value });
          }}
        >
          <option value="" disabled>
            Seleccione una categoría
          </option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Precio:</label>
        <input
          type="number"
          value={product.price}
          required
          onChange={(event) => {
            setProduct({ ...product, price: event.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label>URL de Imagen:</label>
        <input
          type="text"
          value={product.photo}
          required
          onChange={(event) => {
            setProduct({ ...product, photo: event.target.value });
          }}
        />
      </div>
      <div className="form-group">
  <label>Descripción:</label>
  <textarea
    id='description-input'
    value={product.description}
    required
    onChange={(event) => {
      setProduct({ ...product, description: event.target.value });
    }}
  />
</div>

      <div className='btn'>
  <button className="cancel" onClick={onClose}>Cancelar</button>
  <button className="save" onClick={updateProduct}>Guardar</button>
</div>
    </div>
  );
}
