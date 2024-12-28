import React, { useState } from 'react';
import axios from "axios";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
    try {
      const res = await axios.post(`http://localhost:3000/productdetails/search`, { searchTerm: e.target.value });
      const data = res.data;
      setFilteredData(data.existingPosts); // Assuming the response contains an 'existingPosts' array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/home"><h3>Product</h3></a>
      <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <form className="nav col-12 col-md-auto flex-fill mb-2 justify-content-center mb-md-0" role="search" href="/search">
      </form>
      {/* Display details if available */}
      {filteredData && (
        <div>
          {filteredData.map((product, index) => (
            <div key={index}>
              <p>Name: {product.name}</p>
              <p>Product serial Number: {product.psn}</p>
              <p>Brand: {product.brand}</p>
              <p>Stock: {product.stock}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
