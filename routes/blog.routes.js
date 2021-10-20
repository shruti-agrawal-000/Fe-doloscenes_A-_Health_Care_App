const express = require ('express')
const router = express.Router();


const{addBlog,getAllBlogs } = require("../controllers/blog.controller")
const auth = require("../middleware/auth");


router.post('/addBlog',auth,addBlog);
router.get('/getAllBlogs',getAllBlogs);

module.exports =  router;