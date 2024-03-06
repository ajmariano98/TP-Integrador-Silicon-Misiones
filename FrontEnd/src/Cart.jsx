import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Table, Row, Col } from 'react-bootstrap';
import './styles/Cart.css'


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const t = sessionStorage.getItem('token');
    const userLogged = sessionStorage.getItem('userData');
    if (userLogged) {
      setUserData(JSON.parse(userLogged));
    }
    if (t !== token) {
      setToken(t);
    }
  }, [token]);

  useEffect(() => {
    if (userData.user_id) {
      loadCartItems(userData.user_id);
    }
  }, [userData.user_id]);

  const loadCartItems = (userId) => {
    fetchCartItems(userId)
      .then((data) => {
        setCartItems(data);
        calculateTotal(data);
      })
      .catch((error) => {
        console.error('Error al cargar elementos del carrito', error);
      });
  };

  const fetchCartItems = (userId) => {
    return fetch(`http://localhost:8080/cart/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      },
    }).then((res) => res.json());
  };

  const calculateTotal = (items) => {
    let sum = 0;
    for (const item of items) {
      sum += item.quantity * item.price;
    }
    setTotal(sum);
  };

  const clearCart = () => {
    deleteCartItems(userData.user_id)
      .then((data) => {
        if (data.message) {
          toast.success(data.message, getToastOptions());
          setCartItems([]);
          setTotal(0);
        } else if (data.error) {
          toast.warn(data.error, getToastOptions());
        }
      });
  };
  
  const deleteCartItems = (userId) => {
    return fetch(`http://localhost:8080/cart/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      },
    }).then((res) => res.json());
  };
   
  
  const getToastOptions = () => {
    return {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    };
  };

  const buy = () => {
    return (
      toast.success('Gracias por su compra', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    )
  } 
      

  
  
  return (
    <div className="container rounded" id="cart-container">
      <h2>CARRITO</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.cart_item_id}>
                <td>
                  <img
                    src={item.photo}
                    alt={item.name}
                    style={{ maxWidth: '100px' }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {cartItems.length > 0 && (
        <Row className="justify-content-end">
          <Col md="4">
            <p>Total a abonar: ${total}</p>
            <Button variant="success" onClick={buy}>COMPRAR</Button>
            <Button variant="danger" title='Limpiar' className='material-symbols-outlined' onClick={clearCart}>
              mop
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}
