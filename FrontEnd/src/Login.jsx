import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/Login.css'



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      username,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const responseData = await response.json();
  const { token, datos } = responseData;
  sessionStorage.setItem('token', token);

 
  sessionStorage.setItem('userData', JSON.stringify(datos));


        toast.success("Inicio de sesión exitoso", {
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
        window.location.replace('/home');
        }, 1000); 
        
      } else {
        console.error('Error de inicio de sesión');
        toast.error('El nombre de usuario o la contraseña son incorrectos', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      toast.error('Error de inicio de sesión', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
    <div className="login-form">
    <form onSubmit={handleSubmit}>
        <h3>Iniciar Sesión</h3>

        <label for="username">Nombre de Usuario</label>
        <input type="username" autoComplete='on' placeholder="Mínimo de 4 caracteres." id="inputUsername" minLength={4} onChange={handleChangeUsername} value={username} required/>

        <label for="password">Contraseña</label>
        <input type="password" placeholder="Mínimo de 4 caracteres." id="inputPassword" minLength={4} onChange={handleChangePassword} value={password} required/>

        <button type="submit">Ingresar</button>
    </form>
    </div>
    </>
  );
}
