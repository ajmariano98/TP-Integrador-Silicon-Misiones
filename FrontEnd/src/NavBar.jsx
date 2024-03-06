import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './styles/NavBar.css';
import { Link, useNavigate } from 'react-router-dom';



export default function NavBar()  {

  const navigate = useNavigate();

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


  function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    setToken('');
    navigate('/home');
  }

  
  if (token !== '' && token !== null && userData.rol_id === 1) {
    return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid">
          <div className="container-fluid custom-navbar" id="NavBar">
            <a className="navbar-brand" href="#"><img src={logo} alt="Logo" /></a>
            <button
              className="navbar-toggler bg-body-tertiary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ height: '100%' }}>
                <li className="nav-item">
                  <Link to="/home" className="nav-link">INICIO</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">PRODUCTOS</Link>
                </li>
                <li className="nav-item">
                  <Link to="/registerproduct" className="nav-link">CARGAR PRODUCTO</Link>
                </li>
                <li className="nav-item">
                  <Link to="/categories" className="nav-link">CATEGORÍAS</Link>
                </li>
                <li className="nav-item">
                  <Link to="/listusers" className="nav-link">USUARIOS</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/account" className="nav-link material-symbols-outlined" title='Cuenta'>account_circle</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link material-symbols-outlined" onClick={logout} title='Cerrar Sesión'>logout</button>
                </li>
                <li className="nav-item">
                <Link to="/cart" className="nav-link material-symbols-outlined" title='Carrito'>shopping_cart</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </>
      );

    } else if (token !== '' && token !== null && userData.rol_id === 2) {
      return (
        <>
         <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid">
          <div className="container-fluid custom-navbar" id="NavBar">
            <a className="navbar-brand" href="#"><img src={logo} alt="Logo" /></a>
            <button
              className="navbar-toggler bg-body-tertiary" 
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ height: '100%' }}>
                <li className="nav-item">
                  <Link to="/home" className="nav-link">INICIO</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">PRODUCTOS</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/account" className="nav-link material-symbols-outlined" title='Cuenta'>account_circle</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link material-symbols-outlined" onClick={logout} title='Cerrar Sesión'>logout</button>
                </li>
                <li className="nav-item">
                <Link to="/cart" className="nav-link material-symbols-outlined" title='Carrito'>shopping_cart</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </>
      );
    } else {
      return (
        <>
         <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid">
          <div className="container-fluid custom-navbar" id="NavBar">
            <a className="navbar-brand" href="/home"><img src={logo} alt="Logo" /></a>
            <button
              className="navbar-toggler bg-body-tertiary" 
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ height: '100%' }}>
                <li className="nav-item">
                  <Link to="/home" className="nav-link">INICIO</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">PRODUCTOS</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link material-symbols-outlined" title='Ingresar'>login</Link>
                </li>
                <li className="nav-item">
                <Link to="/register" className="nav-link material-symbols-outlined" title='Registrarse'>app_registration</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </>
      );
    }
  }