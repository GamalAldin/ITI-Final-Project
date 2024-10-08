const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const dbURI =
  "mongodb+srv://moshgi:IXjqEk3FFvmKZwrx@cluster0.7d2spuh.mongodb.net/commerce";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// GET all products (Read All)
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// GET products based on search query
app.get("/products/search", async (req, res) => {
  const { query } = req.query; // Get the search query from request parameters
  try {
    const products = await Product.find({
      title: { $regex: query, $options: "i" }, // Search in the title (case insensitive)
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching products", error });
  }
});

// GET a single product by ID (Read One)
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// POST to place an order and update stock
app.post("/order", async (req, res) => {
  const { productId, quantity } = req.body;
  console.log(req.body);

  // Validate ObjectID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(productId);
    if (product && product.stock >= quantity) {
      product.stock -= quantity;
      await product.save();
      res.json({ message: "Order placed successfully", product });
    } else {
      res
        .status(400)
        .json({ message: "Not enough stock or product not found" });
    }
  } catch (error) {
    console.error("Error placing order:", error); // Log the error
    res.status(500).json({ message: "Error placing order", error });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
