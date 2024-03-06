import React from 'react';
import './styles/Account.css'

export default function Account() {
  return (
    <div className='container account-container'>
      <form className='account-form rounded'>
        <h2>CONFIGURACIÓN DE CUENTA</h2>
        <label htmlFor="username">Nombre de Usuario:</label>
        <input type="text" id="username" name="username" /><br /><br />

        <label htmlFor="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email"/><br /><br />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" /><br /><br />

        <input type="submit" value="Actualizar" />
      </form>
    </div>
  );
}
