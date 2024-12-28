const express = require('express');
const router = express.Router();
const Productdetails = require("../models/productdetails");

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    const name = req.body.name; // Get the name from the request body
    const filename = `${name}_${Date.now()}${path.extname(file.originalname)}`; // Construct filename with timestamp and original extension
    cb(null, filename); // Set the filename
  }
});

const upload = multer({ storage: storage });

router.post("/addproduct", (req, res) => {
    const {
        name,
        category,
        price,
        stock,
        brand, // Updated to match the payload
        psn,
        weight,
        dateAdded,
        rating,
        contact,
        description,
    } = req.body;

    // Log the payload for debugging
    console.log("Incoming Payload:", req.body);

    // Validate required fields
    if (!name || !category || !price || !stock || !brand) {
        return res.status(400).json({ 
            status: "Error", 
            error: "Required fields are missing: name, category, price, stock, or brand" 
        });
    }

    // Convert numeric fields from strings to numbers
    const numericPrice = parseFloat(price);
    const numericStock = parseInt(stock, 10);
    const numericRating = parseFloat(rating);

    if (isNaN(numericPrice) || isNaN(numericStock) || isNaN(numericRating)) {
        return res.status(400).json({
            status: "Error",
            error: "Price, stock, and rating must be valid numbers",
        });
    }

    const newProduct = new Productdetails({
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
    });

    newProduct.save()
        .then(() => {
            res.status(201).json({ status: "Product Added" });
        })
        .catch((err) => {
            console.error("Error adding product:", err.message);
            res.status(500).json({ 
                status: "Error adding product", 
                error: err.message 
            });
        });
});



router.route("/").get((req, res) => {
    Productdetails.find().then((productdetails) => {
        res.json(productdetails);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error fetching products", error: err.message });
    });
});

//get product's details
router.route("/get/:id").get(async (req, res) => {
    let id = req.params.id;
    try {
        const product = await Productdetails.findById(id);
        if (product) {
            res.status(200).send({ status: "Product fetched", product });
        } else {
            res.status(404).send({ status: "Product not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error fetching product", error: err.message });
    }
});

//view product's details
router.route("/viewproduct/:id").get(async (req, res) => {
    let id = req.params.id;
    try {
        const product = await Productdetails.findById(id);
        if (product) {
            res.status(200).send({ status: "Product fetched", mother });
        } else {
            res.status(404).send({ status: "Product not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error fetching product", error: err.message });
    }
});

//edit product
router.route("/editproduct/:id").put(async (req, res) => {
    let id = req.params.id;
    const { name, category, price, stock, Brand, psn, weight, dateAdded, rating, contact, description } = req.body;

    const updateproduct = {
        name,
        category,
        price,
        stock,
        Brand,
        psn,
        weight,
        dateAdded,
        rating,
        contact,
        description
    };

    try {
        const update = await Productdetails.findByIdAndUpdate(id, updateproduct);
        res.status(200).send({ status: "Product updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating product", error: err.message });
    }
});

//delete product
router.route("/deleteproduct/:_id").delete(async (req, res) => {
    let productId = req.params._id;

    try {
        await Productdetails.findByIdAndDelete(productId);
        res.status(200).send({ status: "Product deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error deleting mother", error: err.message });
    }
});

//search product
router.post('/search', async (req, res) => {
    try {
      const searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
  
      const products = await Productdetails.find({
        $or: [
          { name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        //   { age: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        //   { bloodgroup: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          // Add more fields to search here as needed
        ]
      });
  
      res.json({ success: true, existingPosts: products }); // Send JSON response with search results
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;