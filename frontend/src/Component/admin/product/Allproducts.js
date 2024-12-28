import React, { useEffect, useState } from 'react';
import axios from "axios";
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../indexAdmin.css';

function Allproducts() {
  const [productdetails, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get('http://localhost:8090/productdetails/');
      setProduct(response.data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Function to handle deletion of a product
  const onDeleteClick = async (productId) => {
    try {
      await axios.delete(`http://localhost:8090/productdetails/deleteproduct/${productId}`);
      alert('Product Deleted Successfully');
      window.location.href = "/allproduct";
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Function to handle search input change
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    try {
      const response = await axios.post('http://localhost:8090/productdetails/search', { searchTerm: value });
      setFilteredData(response.data.existingPosts);
    } catch (error) {
      console.error('Error searching products:', error);
      alert('Error searching products');
    }
  };

  const productsToDisplay = filteredData.length > 0 ? filteredData : productdetails;

  return (
    <div>
      <div>
        <Header/>
        <Sidebar/>
      </div>
      <div className='AllTable'>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard - Products Management</h1>
        <div>
          <input 
            type="text"
            name="searchQuery" 
            className="form-control form-control-dark w-100 rounded-0" 
            placeholder="Enter Name..." 
            aria-label="Enter Name"
            value={searchTerm} 
            onChange={handleSearchChange} 
            style={{ border: '1px solid #ced4da', marginRight: '10px' }}
          />
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <a href="/addproduct" className="btn btn-sm btn-outline-secondary">+ New Product</a>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Brand</th>
              <th scope="col">Product Serial Number</th>
              <th scope="col">Weight</th>
              <th scope="col">Date Added</th>
              <th scope="col">Rating</th>
              <th scope="col">Contact</th>
              <th scope="col">Description</th>
              {/* <th scope="col">Proof pic</th> */}
              <th scope="col" className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
  {productsToDisplay.map((product, index) => (
    <tr key={index}>
      <td>{(index + 1).toString().padStart(4, '0')}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
      <td>{product.stock}</td>
      <td>{product.brand}</td>
      <td>{product.psn}</td>
      <td>{product.weight}</td>
      <td>{new Date(product.dateAdded).toLocaleDateString()}</td>
      <td>{product.rating}</td>
      <td>{product.contact}</td>
      <td>{product.description}</td>
      {/* <td>
        <img src={`http://localhost:8090/uploads/${product.proofpic}.jpg`} alt="NIC" style={{ maxWidth: '100px' }} />
      </td> */}
      <td className="text-end">
        <div className="d-flex flex-row justify-content-end gap-2">
          <a href={`/viewproduct/${product._id}`} className="btn btn-primary btn-small" alt="View">
            <i className="bi bi-eye"></i>
          </a>
          <a href={`/editproduct/${product._id}`} className="btn btn-warning btn-small">
            <i className="bi bi-pencil"></i>
          </a>
          <button onClick={() => onDeleteClick(product._id)} className="btn btn-danger btn-small">
            <i className="bi bi-person-x"></i>
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
      </div>
    </div>
  );
}

export default Allproducts;
