import { Route, Routes} from 'react-router-dom';
import Home from './Home';
import NavBar from './NavBar';
import RegisterUser from './RegisterUser';
import ListUsers from './ListUsers';
import RegisterProduct from './RegisterProduct';
import  Categories  from './Categories';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Account from './Account';
import Products from './Products';
import Cart from './Cart';
import './styles/App.css';


export default function App() {
 
   return (
    <>
    <NavBar/>
    <div className="container" id="components">
    <Routes>
    <Route path="/account" element={<Account />}></Route>
    <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<RegisterUser />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/listusers" element={<ListUsers />}></Route>
      <Route path="/registerproduct" element={<RegisterProduct />}></Route>
      <Route path="/categories" element={<Categories />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
    </Routes>
    <ToastContainer />
    </div>
    </>
   );
 }
