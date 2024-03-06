import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/RegisterUser.css'

export default function RegisterUser() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Recolecta los valores del formulario y realiza la acción de registro en tu backend
    const userToRegister = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    

    let fetchData = {
      method: 'POST',
      body: JSON.stringify(userToRegister),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log(userToRegister)

    fetch('http://localhost:8080/users', fetchData)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          toast.error(result.error, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          
          
        } else if (result.message) {
          toast.success(result.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            window.location.replace('/login');
            }, 1000);
        }
      });
  };

  const handleUsernameChange = (event) => {
    setUser({ ...user, username: event.target.value });
  };
  
  const handleEmailChange = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  
  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  return (
    <>
    <div className="register-form">
    <form onSubmit={handleSubmit}>
        <h3>Registrarse</h3>

        <label for="username">Nombre de Usuario</label>
        <input 
        type="username" 
        autoComplete='on' 
        placeholder="Mínimo de 4 caracteres." 
        id="inputUsername" 
        minLength={4} 
        onChange={handleUsernameChange}
        name="username"
        value={user.username} 
        required/>
        
        <label for="email">Correo electrónico</label>
        <input type="email" 
        autoComplete='on' 
        placeholder="user@example.com" 
        id="inputEmail" 
        onChange={handleEmailChange}
        name="email"
        value={user.email} 
        required
        />
        
        <label for="password">Contraseña</label>
        <input type="password" 
        placeholder="Mínimo de 4 caracteres." 
        id="inputPassword" 
        minLength={4} 
        onChange={handlePasswordChange}  
        value={user.password}
        name="password"
        required
        />
        <div className="d-flex justify-content-between">
        <button type="submit" className="submit-btn">Registrar</button>
        <button type="reset" className="reset-btn">Cancelar</button>
        </div>
    </form>
    </div>
    </>
  );
}
