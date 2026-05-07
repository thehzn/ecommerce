const express=require("express");
const { userRegister ,updateUser, userLogin,userLogout, getAllusers, updateUserStatus } = require("../controllers/userControllers");
const {userAuthenticate, userAutherize}=require("../middlewares/auth");
const router=express.Router();


router.route("/register").post(userRegister);
router.route("/updateprofile").patch(userAuthenticate,updateUser);
router.route("/login").post(userLogin);
router.route("/logout").post(userAuthenticate,userLogout);
router.route("/users").get(userAuthenticate,userAutherize('admin'),getAllusers);
router.route("/update-status/:id").patch(userAuthenticate,userAutherize('admin'),updateUserStatus);
module.exports=router;