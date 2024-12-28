import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../indexAdmin.css';

export default function AddProducts() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [psn, setPSN] = useState('');
  const [weight, setWeight] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [rating, setRating] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  const addProduct = (e) => {
    e.preventDefault();

    // Prepare the product details payload
    const formData = {
      name,
      category,
      price,
      stock,
      brand,
      psn,
      weight,
      dateAdded,
      rating,
      contact,
      description,
    };

    axios
      .post('http://localhost:8090/productdetails/addproduct', formData)
      .then(() => {
        alert('Product Added');
        window.location.href = '/allproduct';
      })
      .catch((err) => {
        alert('Error adding product: ' + err.message);
      });
  };

  const handleReset = () => {
    setName('');
    setCategory('');
    setPrice('');
    setStock('');
    setBrand('');
    setPSN('');
    setWeight('');
    setDateAdded('');
    setRating('');
    setContact('');
    setDescription('');
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="tableProduct">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Products</h1>
        </div>
        <form onSubmit={addProduct}>
          <div className="row form-group mb-4">
            <div className="col">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Product Category"
                required
              />
            </div>
          </div>
          <div className="row form-group mb-4">
            <div className="col">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product Price"
                min="0"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="stock">Stock:</label>
              <input
                type="text"
                className="form-control"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Available Stock"
                required
              />
            </div>
          </div>
          <div className="row form-group mb-4">
            <div className="col">
              <label htmlFor="brand">Brand:</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Product Brand"
              />
            </div>
            <div className="col">
              <label htmlFor="psn">Product Serial Number:</label>
              <input
                type="text"
                className="form-control"
                id="psn"
                value={psn}
                onChange={(e) => setPSN(e.target.value)}
                placeholder="Serial Number"
              />
            </div>
          </div>
          <div className="row form-group mb-4">
            <div className="col">
              <label htmlFor="weight">Weight (kg):</label>
              <input
                type="number"
                className="form-control"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight in kg"
                min="0"
              />
            </div>
            <div className="col">
              <label htmlFor="dateAdded">Date Added:</label>
              <input
                type="date"
                className="form-control"
                id="dateAdded"
                value={dateAdded}
                onChange={(e) => setDateAdded(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
          <div className="row form-group mb-4">
            <div className="col">
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                className="form-control"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rating (1-5)"
                min="1"
                max="5"
              />
            </div>
            <div className="col">
              <label htmlFor="contact">Contact:</label>
              <input
                type="tel"
                className="form-control"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact Number"
                pattern="[0-9]{9}"
                title="Enter a valid contact number (9 digits)."
                required
              />
            </div>
          </div>
          <div className="row form-group mb-4">
            <div className="col">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
              ></textarea>
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
