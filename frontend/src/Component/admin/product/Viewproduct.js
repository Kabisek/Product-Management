import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProductPDFDocument from './ProductPDFDocument'; // Assuming you have a separate component for generating PDF
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../indexAdmin.css';

function ViewProduct() {
  const [productData, setProductData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8090/productdetails/get/${id}`)
      .then((res) => {
        setProductData(res.data.product);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  if (!productData) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <div>
      <Header/>
      <Sidebar/>
      <div className='tableProduct'>
        <div className="d-flex justify-content-between flex-wrap flex-md nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{productData.name}</h1>
        </div>
        <div className="col py-3">
          <div className="row">
            <div className="col">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/allproduct">Product Management</a></li>
                  <li className="breadcrumb-item active">{productData.name}</li>
                </ol>
              </nav>
            </div>
            <div className="col text-end fw-lighter">
              {/* Add Last Updated and UserId here */}
            </div>
          </div>
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col" style={{ maxWidth: '140px' }}> <b>Name:</b></div>
                <div className="col">{productData.name}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col" style={{ maxWidth: '140px' }}> <b>Category:</b></div>
                <div className="col">{productData.category}</div>
              </div>
            </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col" style={{ maxWidth: '140px' }}> <b>Price:</b></div>
              <div className="col">{productData.price}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col" style={{ maxWidth: '140px' }}> <b>Stock:</b></div>
              <div className="col">{productData.stock}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col" style={{ maxWidth: '140px' }}> <b>Brand:</b></div>
              <div className="col">{productData.brand}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col" style={{ maxWidth: '140px' }}> <b>Product Serial Number:</b></div>
              <div className="col">{productData.psn}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col" style={{ maxWidth: '140px' }}> <b>Weight:</b></div>
              <div className="col">{productData.weight}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col" style={{ maxWidth: '140px' }}> <b>Date Added:</b></div>
              <div className="col">{productData.dateAdded}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col" style={{ maxWidth: '140px' }}> <b>Rating:</b></div>
              <div className="col">{productData.rating}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col" style={{ maxWidth: '140px' }}> <b>Contact:</b></div>
              <div className="col">{productData.contact}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col" style={{ maxWidth: '140px' }}> <b>Description:</b></div>
              <div className="col">{productData.description}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col" style={{ maxWidth: '140px' }}> <b>Date Added:</b></div>
              <div className="col">{new Date().toLocaleString()}</div>
            </div>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default ViewProduct;
