import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import EditProduct from './EditProduct';
import './styles/Products.css'

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const [modalDeleteProduct, setModalDeleteProduct] = useState(false);
  const [modal, setModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchProducts = async () => {
    try {
      const url = new URL('http://localhost:8080/search');
      url.searchParams.append('name', searchQuery);
      url.searchParams.append('category', selectedCategory);
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setProductsList(data);
      } else {
        console.error('Error en la búsqueda de productos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };



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

  const loadProducts = () => {
    let url = 'http://localhost:8080/productslist';

    if (selectedCategory !== "") {
      url += `/category/${selectedCategory}`;
    }

    if (searchQuery.trim() !== '') {
      url += `/search?name=${searchQuery}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProductsList(data);
      })
      .catch((error) => {
        console.error('Error al cargar los productos', error);
      });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    searchProducts();
  };
  

  useEffect(() => {
    const t = sessionStorage.getItem('token');
    const userLogged = sessionStorage.getItem('userData');
    if (userLogged) {
      setUserData(JSON.parse(userLogged));
    }
    if (t !== token) {
      setToken(t);
    }
    loadCategories();
  }, [token]);

  useEffect(() => {
    searchProducts();
  }, [selectedCategory, searchQuery]);
  

  const formatAsCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value).replace('ARS', '');
  };

  const editProduct = (product_id) => {
    setEditingProductId(product_id);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setModalDeleteProduct(false);
    setEditingProductId(null);
    loadProducts();
  };

  const deleteProduct = (product_id) => {
    setProductToDelete(product_id);
    setModalDeleteProduct(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      fetch(`http://localhost:8080/products/${productToDelete}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toast.success(data.message, {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
            closeModal();
            loadProducts();
          } else if (data.error) {
            toast.warn(data.error, {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          }
        });
    }
  };

  const addToCart = (product_id) => {
    if (userData.rol_id === 1 || userData.rol_id === 2) {

      fetch('http://localhost:8080/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ user_id: userData.user_id, product_id: product_id, quantity: 1 })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toast.success(data.message, {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          } else if (data.error) {
            toast.error(data.error, {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          }
        });
    } else {
      toast.error("Inicie sesión para habilitar el carrito", {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };


  if (token !== '' && token !== null && userData && userData.rol_id === 1) {
    return (
      <>
        <div class="container">
          <div class="row">
            <hr />
            <div class="col-md-3 filters">
              <form id="search" className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar nombre, marca, etc..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      searchProducts();
                    }
                  }}
                />
              </form>
              <hr />
              <h2>FILTRAR POR CATEGORÍAS</h2>
              <select
                value={selectedCategory}
                onChange={(event) => handleCategoryChange(event.target.value)}
              >
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>

            </div>
            <div class="col-md-9 products">
              <ul class="product-list">
                {productsList.map((product) => (
                  <li key={product.product_id} class="product-card rounded">
                    <div class="product-image">
                      <img
                        src={product.photo}
                        alt={product.name}
                      />
                    </div>
                    <div class="product-details">
                      <h3 id="h3-name">{product.name}</h3>
                      <p id="p-brand">{product.brand}</p>
                      <p id="p-category">{categories.find((c) => c.category_id === product.category_id)?.category_name}</p>
                      <p id="p-price">{formatAsCurrency(product.price)}</p>
                    </div>
                    <div class="product-actions">
                      <button
                        class="btn btn-primary material-symbols-outlined"
                        title="Editar Producto"
                        onClick={() => editProduct(product.product_id)}
                      >
                        edit
                      </button>
                      <button
                        class="btn btn-danger material-symbols-outlined"
                        title="Borrar Producto"
                        onClick={() => deleteProduct(product.product_id)}
                      >
                        delete
                      </button>
                      <button
                        class="btn btn-success material-symbols-outlined"
                        title="Agregar al Carrito"
                        onClick={() => addToCart(product.product_id)}
                      >
                        add_shopping_cart
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Modal id="ModalDeleteProduct" show={modalDeleteProduct} onHide={closeModal}>
          <Modal.Header>
            <Modal.Title>Eliminar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Seguro que deseas eliminar este producto?</Modal.Body>
          <Modal.Footer className='justify-content-center'>
            <Button variant="danger" onClick={confirmDelete}>
              Confirmar
            </Button>
            <Button variant="primary" onClick={closeModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
        {editingProductId && (
          <Modal id="ModalEditingProduct" show={modal} onHide={closeModal}>
            <Modal.Body>
              <EditProduct product_id={editingProductId} onClose={closeModal} />
            </Modal.Body>
          </Modal>
        )}
      </>
    );
  } else {
    return (
      <>
        <div class="container">
          <div class="row">
            <hr />
            <div class="col-md-3 filters">
              <form id="search" className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar nombre, marca, etc..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault(); 
                      searchProducts();
                    }
                  }}
                />
              </form>
              <hr />
              <h2>FILTRAR POR CATEGORÍAS</h2>
              <select
                value={selectedCategory}
                onChange={(event) => handleCategoryChange(event.target.value)}
              >
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-md-9 products">
              <ul class="product-list">
                {productsList.map((product) => (
                  <li key={product.product_id} class="product-card rounded">
                    <div class="product-image">
                      <img
                        src={product.photo}
                        alt={product.name}
                      />
                    </div>
                    <div class="product-details">
                      <h3 id="h3-name">{product.name}</h3>
                      <p id="p-brand">{product.brand}</p>
                      <p id="p-category">{categories.find((c) => c.category_id === product.category_id)?.category_name}</p>
                      <p id="p-price">{formatAsCurrency(product.price)}</p>
                    </div>
                    <div class="product-actions">
                      <button
                        class="btn btn-success material-symbols-outlined"
                        title="Agregar al Carrito"
                        onClick={() => addToCart(product.product_id)}
                      >
                        add_shopping_cart
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

