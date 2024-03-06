import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './styles/ListUsers.css'

export default function ListUsers() {
  const [listUsers, setlistUsers] = useState([]);
  const [modalDeleteUser, setModalDeleteUser] = useState(false);
  const [selectedUserUsername, setSelectedUserUsername] = useState(null);
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

  const loadListUsers = () => {
    fetch("http://localhost:8080/userslist")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setlistUsers(result);
      })
      .catch((error) => {
        console.error('Error al cargar los usuarios', error);
      });
  }


  useEffect(() => {
    loadListUsers();
  }, []);


  const handleDeleteUser = (username) => {
    setModalDeleteUser(true);
    setSelectedUserUsername(username);
  };

  const closeModalDeleteUser = () => {
    setModalDeleteUser(false);
    setSelectedUserUsername(null);
  };

  const deleteSelectedUser = () => {
    if (selectedUserUsername) {
      console.log(`Borrando usuario con username: ${selectedUserUsername}`);
      fetch(`http://localhost:8080/users/${selectedUserUsername}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toast.success(data.message, {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            loadListUsers();
            closeModalDeleteUser();
          } else if (data.error) {
            toast.warn(data.error, {
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
        });
    }
  };
  

  if (token !== '' && token !== null && userData && userData.rol_id === 1) {
  return (
    <>
      <div className="container rounded" id="listusers">
        <h2>LISTA DE USUARIOS</h2>
        {listUsers.map((userlist, index) => (
          <div className="row" key={index}>
            <div className="col">
              <strong>Nombre de Usuario: </strong>
              <span>{userlist.username}</span>
              <br />
              <strong>Correo Electrónico: </strong>
              <span>{userlist.email}</span>
              <br />
              <strong>Rol: </strong>
              <span>{userlist.rol_name}</span>
              <br />
              <div className='justify-content-between'>
              <button
                className="btn btn-danger material-symbols-outlined"
                onClick={() => handleDeleteUser(userlist.username)}
              >
                delete
              </button>
              </div>
              <hr />
            </div>
          </div>
        ))}
      </div>

      <Modal id="ModalDeleteUser" show={modalDeleteUser} onHide={closeModalDeleteUser}>
        <Modal.Header>
          <Modal.Title>Eliminar Usuario</Modal.Title>
          </Modal.Header>
        <Modal.Body>¿Seguro que deseas eliminar el usuario?</Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant="danger" onClick={deleteSelectedUser}>
            Confirmar
          </Button>
          <Button variant="primary" onClick={closeModalDeleteUser}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
} else {
  return (
    <>
    <h2>Acceso denegado</h2>
    </>
  )
}
}