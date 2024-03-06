import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/RegisterProduct.css'

export default function RegisterProduct() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category_id, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
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
    loadCategories();
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const product = {
      name,
      brand,
      category_id,
      price,
      photo,
      description,
    };

    let fetchData = {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:8080/registerproducts', fetchData)
      .then((res) => res.json())
      .then(handleRegistrationResponse)
      .catch(handleRegistrationError);
  };

  const handleRegistrationResponse = (result) => {
    if (result.error) {
      console.error(result.error);
      toast.error(result.error, getToastOptions());
    } else if (result.message) {
      console.log(result.message);
      toast.success(result.message, getToastOptions());
      clearForm();
    }
  };

  const handleRegistrationError = (error) => {
    console.error('Error en la solicitud', error);
    toast.error('Error en la solicitud', getToastOptions());
  };

  const clearForm = () => {
    setName('');
    setBrand('');
    setCategory('');
    setPrice(0);
    setPhoto('');
    setDescription('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'category_id' && value !== '0') {
      setCategory(value);
    } else {
      setCategory('');
    }

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'brand':
        setBrand(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'photo':
        setPhoto(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
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

  if (token !== '' && token !== null && userData && userData.rol_id === 1) {
    return (
      <div className='rounded' id='upload-product-form'>
  <h2>CARGAR PRODUCTO</h2>
  <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label>Nombre:</label>
      <input
        type='text'
        className='form-control'
        name='name'
        onChange={handleChange}
        value={name}
        required
      />
    </div>
    <div className='form-group'>
      <label>Marca:</label>
      <input
        type='text'
        className='form-control'
        name='brand'
        onChange={handleChange}
        value={brand}
        required
      />
    </div>
    <div className='form-group'>
      <label>Categoría:</label>
      <select
        className='form-select'
        name='category_id'
        value={category_id}
        onChange={handleChange}
        required
      >
        <option value='' disabled>
          Seleccione una categoría
        </option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
    <div className='form-group'>
      <label>Precio:</label>
      <input
        type='number'
        className='form-control'
        name='price'
        onChange={handleChange}
        value={price}
        required
      />
    </div>
    <div className='form-group'>
      <label>URL de la Foto:</label>
      <input
        type='text'
        className='form-control'
        name='photo'
        onChange={handleChange}
        value={photo}
        required
      />
    </div>
    <div className='form-group'>
      <label>Descripción:</label>
      <textarea
        className='form-control'
        name='description'
        onChange={handleChange}
        value={description}
        required
        rows='4'
      />
    </div>
    <div className='btn-large'>
      <button type='submit' title='Cargar' className='save material-symbols-outlined'>
        publish
      </button>
      <button type='button' title='Limpiar' className='cancel material-symbols-outlined' onClick={clearForm}>
       mop
      </button>
    </div>
  </form>
</div>

    );
  } else {
    return (
      <>
        <h2 id="access-denied" className='rounded'>No posee acceso, ingrese con una cuenta administrador</h2>
      </>
    );
  }
}
<span class="material-symbols-outlined">
publish
</span>