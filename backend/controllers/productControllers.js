const Product = require('../models/productModel');

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        // .sort({ createdAt: -1 }) ensures the newest items show up first
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error("Get All Products Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error: Could not fetch products"
        });
    }
};





exports.addProduct = async(req,res)=>{
    try {
        // 1. Check if Multer actually found a file
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "Please upload an image" 
            });
        }

        // 2. Destructure text fields from req.body
        const { productname, productprice,productdescription } = req.body;

        // 3. Create the product in the database
        // We save the path where Multer stored the file
        const product = await Product.create({
            productname,
            productprice,
            productdescription,
            productimage: `/uploads/${req.file.filename}` 
        });

        // 4. Send success response back to React
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

exports.getSingleProduct = async (req, res) => {
    try {
        // 1. Extract ID from URL (e.g., /api/v1/product/65c2f8...)
        const { id } = req.params;

        // 2. Search database
        const product = await Product.findById(id);

        // 3. Handle if product doesn't exist
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found with this ID"
            });
        }

        // 4. Send success response
        res.status(200).json({
            success: true,
            product // This is the 'product' key your frontend api.js looks for
        });

    } catch (error) {
        // Handle invalid MongoDB ObjectIDs (CastError)
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: `Invalid ID format: ${error.value}`
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error: " + error.message
        });
    }
};
// exports.updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // Handle image update separately if a new file is uploaded
//     const updateData = req.body;
//     if (req.file) {
//       updateData.productimage = `/uploads/${req.file.filename}`;
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: "Update failed" });
//   }
// };
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. Create a clean update object from req.body
    const updateData = { ...req.body };

    // 2. Only update the image field IF a new file was actually uploaded
    if (req.file) {
      updateData.productimage = `/uploads/${req.file.filename}`;
    }

    // 3. Find and update
    const updatedProduct = await Product.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true } // runValidators ensures the update follows your Model rules
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // 4. Send back a structure that matches your frontend logic
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Update failed: " + error.message 
    });
  }
};

exports.deleteProduct =async(req,res) =>{
    try{
        const {id} =req.params;

        const deletedProduct =await Product.findByIdAndDelete(id);

        if(!deletedProduct){
            res.status(404).json({
                message:"Product not found"
            })
        }
       res.status(200).json({ 
            message: "Product deleted successfully",
            data: deletedProduct 
        }); 
    }
        catch(error){
             res.status(500).json({ message:"server error",error:error.message });
        }

        
    }

