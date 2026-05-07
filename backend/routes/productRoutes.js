const express = require("express");
const upload =require("../middlewares/multer");
const { addProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct } = require("../controllers/productControllers");
const { userAuthenticate, userAutherize } = require("../middlewares/auth");
const router = express.Router();


router.route('/allproducts').get(getAllProducts);
router.route("/addproduct").post(userAuthenticate,userAutherize('admin'),upload.single('productimage'),addProduct);
router.route("/:id").get(getSingleProduct);
router.route("/:id").put(userAuthenticate,userAutherize('admin'),upload.single('productimage'),updateProduct);
router.route("/:id").delete(userAuthenticate,userAutherize('admin'),deleteProduct);




module.exports=router;