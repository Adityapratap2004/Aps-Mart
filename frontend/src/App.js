
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CategorywiseProduct from './Page/CategorywiseProduct';
import Home from './Page/Home';
import ProductDetailPage from './Page/ProductDetailPage';
import Login from './Components/Login';
import Singup from './Components/Singup';
import AdminPage from './Page/AdminPage';
import Toastify from './Components/Toastify';
import UserProfilepage from './Page/UserProfilepage';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/category/:id" element={<CategorywiseProduct />} />
          <Route exact path="/productdetails/:id" element={<ProductDetailPage />} />
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Singup/>}/>
          <Route exact path="/dashboard" element={<AdminPage/>} />
          <Route exact path="/profile" element={<UserProfilepage/>}/>
        </Routes>
        <Toastify/>
        
       
      </BrowserRouter>

    </div>
  );
}

export default App;
