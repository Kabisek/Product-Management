import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './Component/admin/Header';
import SidebarAdmin from './Component/admin/Sidebar';
import './index'
import HomePage from './Component/Welcome';
// import Homemiwifes from './Component/Homemidwife';
import Login from './Component/admin/LoginFormAdmin';
import Register from './Component/admin/Register';
import Allproducts from './Component/admin/product/Allproducts';
import AddProducts from './Component/admin/product/Addproducts';
import EditProduct from './Component/admin/product/Updateproduct';
import ViewProduct from './Component/admin/product/Viewproduct';



const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        
          <Route path='/' element={<HomePage />} />         
          <Route path='/login' element={<Login />} />  
          <Route path='/regi' element={<Register />} />  
          <Route path='/home' element={<Allproducts />} />
          <Route path='/addproduct' element={<AddProducts />} />
          <Route path='/logout' element={<Login />} /> 
          <Route path='/addproduct' element={<Allproducts />} /> 
          <Route path='/allproduct' element={<Allproducts />} /> 
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/viewproduct/:id" element={<ViewProduct />} />
              
      </Routes>
    </BrowserRouter>
  );
}

export default App;
