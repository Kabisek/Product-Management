import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../indexAdmin.css';

export default function EditProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [psn, setPSN] = useState("");
  const [weight, setWeight] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [rating, setRating] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8090/productdetails/get/${id}`)
      .then((res) => {
        const product = res.data.product;
        setName(product.name);
        setCategory(product.category);
        setPrice(product.price);
        setStock(product.stock);
        setBrand(product.brand);
        setPSN(product.psn);
        setWeight(product.weight);
        setDateAdded(product.dateAdded);
        setRating(product.rating);
        setContact(product.contact);
        setDescription(product.description);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  function updateProduct(e) {
    e.preventDefault();
    const updatedProduct = {
      name,
      category,
      price,
      stock,
      brand,
      psn,
      weight,
      dateAdded: dateAdded,
      rating,
      contact,
      description
    };

    // Send updated product details to the server
    axios
      .put(`http://localhost:8090/productdetails/editproduct/${id}`, updatedProduct)
      .then(() => {
        alert("Product Updated");
        window.location.href = "/allproduct";
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // Function to handle deletion of a product
  const onDeleteClick = async (userId) => {
    await axios.delete(`http://localhost:8090/productdetails/deleteproduct/${userId}`).then(()=>{
      alert("Product deleted");
      window.location.href="/allproduct"
    });

  }
  
  function handleDeleteProduct() {
    // Send DELETE request to delete product record
    axios
      .delete(`http://localhost:8090/productdetails/editproduct/${id}`)
      .then(() => {
        alert("Product Deleted");
        window.location.href = "/productdetails";
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div>
      <div>
        <Header/>
        <Sidebar/>
      </div>
      <div className='tableProduct'>
      <div className="d-flex justify-content-between flex-wrap flex-md nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Edit {name}</h1>
      </div>

      <div className="col py-3">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/allproduct">Products management</a></li>
                <li className="breadcrumb-item active">{name}</li>
              </ol>
            </nav>
          </div>
          {/* <div className="col text-end fw-lighter">
            <b>UserId: {id}</b>
          </div> */}
        </div>
      </div>

      <form onSubmit={updateProduct}>
        <div className="row form-group mb-4">
        <div className="col">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Name"
              onChange={(e) => {
                const inputValue = e.target.value;
                const regex = /^[A-Za-z ]+$/; // Regular expression to allow letters, numbers, and spaces
            
                if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                  setName(inputValue);
                }
              }}
              required
            />
          </div>
          <div className="col">
              <label htmlFor="category">Category : </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={category}
                placeholder="Category"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^[A-Za-z ]+$/; // Regular expression to allow letters, numbers, and spaces
              
                  if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                    setCategory(inputValue);
                  }
                }}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={price}
                disabled
              />
            </div>
        </div>

        <div className="row form-group mb-4">
          <div className="col">
              <label htmlFor="stock">Stock : </label>
              <input
                type="text"
                className="form-control"
                id="stock"
                name="stock"
                value={stock}
                placeholder="Stock"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^[A-Za-z ]+$/; // Regular expression to allow letters, numbers, and spaces
              
                  if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                    setStock(inputValue);
                  }
                }}
                required
              />
            </div>

            <div className="col">
              <label htmlFor="brand">Brand : </label>
              <input
                type="text"
                className="form-control"
                id="brand"
                name="brand"
                value={brand}
                placeholder="Brand"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^[A-Za-z ]+$/; // Regular expression to allow letters, numbers, and spaces
              
                  if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                    setBrand(inputValue);
                  }
                }}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="psn">Product Serial Number : </label>
              <input
                type="text"
                className="form-control"
                id="psn"
                name="psn"
                value={psn}
                placeholder="Product Serial Number"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^[A-Za-z ]+$/; // Regular expression to allow letters, numbers, and spaces
              
                  if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                    setPSN(inputValue);
                  }
                }}
                required
              />
            </div>
        </div>

        <div className="row form-group mb-4">
        <div className="col">
              <label htmlFor="weight">Weight(kg):</label>
              <input
                type="number"
                className="form-control"
                id="weight"
                name="weight"
                value={weight}
                disabled
              />
            </div>
            <div className="col">
              <label htmlFor="dateAdded">Date Added:</label>
              <input
                type="date"
                className="form-control"
                id="dateAdded"
                name="dateAdded"
                value={dateAdded}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const currentDate = new Date();
                  if (selectedDate <= currentDate) {
                    setDateAdded(e.target.value);
                  }
                }}
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
                name="rating"
                value={rating}
                disabled
              />
        </div>
        <div className="col">
                  <label htmlFor="contact">Contact : </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">+94</span>
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      id="contact"
                      name="contact"
                      placeholder="771234567"
                      maxLength="9"
                      minLength="9"
                      title="Please enter a valid telephone number."
                      value={contact}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const regex = /^[0-9]+$/; // Regular expression to allow letters, numbers, and spaces
                    
                        if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                          setContact(inputValue);
                        }
                      }}
                      required
                    />
                  </div>
            </div>
            <div className="col">
              <label htmlFor="description">description : </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={description}
                placeholder="Description"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^[A-Za-z ]+$/; // Regular expression to allow letters, numbers, and spaces
              
                  if (regex.test(inputValue) || e.nativeEvent.inputType === "deleteContentBackward") {
                    setDescription(inputValue);
                  }
                }}
                required
              />
            </div>
            </div>

        <br />
        <div className="form-group mb-4">
          <button type="submit" className="btn btn-primary">Update Product</button>
          <i> </i>
          <button type="button" onClick={()=>onDeleteClick(id)}  className="btn btn-danger" data-bs-toggle="modal" id="deleteButton" data-bs-target="#deleteModal">Delete Product</button>
        </div>
      </form>

      <div className="modal fade" tabIndex="-1" role="dialog" id="deleteModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">You are about to remove a product record.</div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>
                This will remove the product record of <b className="fw-bold">{name}</b><br />
                Are you sure?
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <form onSubmit={handleDeleteProduct} className="position-relative">
                <button type="submit" className="btn btn-primary">Yes, Remove Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}