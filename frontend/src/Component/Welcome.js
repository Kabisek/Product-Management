import React from 'react';
import './HomePage.css';
import './logo2.jpg'; // Import CSS file for styling

const HomePage = () => {
  return (
    <div>
    <div className="homepage">
      <div className="buttons-container">
        <a href="login"><button className="button" ><h3>Admin Login</h3></button></a>
      </div>
    </div>
    </div>
  );
}


export default HomePage;