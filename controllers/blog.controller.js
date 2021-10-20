const Blog = require("../models/blogs.model")

const addBlog = async (request, response) => {
    console.log("wwwwww");
    const { title, desc, writtenby } = request.body;
    console.log("body", request.body);

    try {
        if (!request.body.title || !request.body.desc) {
            return response.status(400).json({ error: "Add title and description" });
        }
        const blog = new Blog({
            title, desc, writtenby
        });
        blog.save();
        response.status(201).json(blog);
        console.log("blog created");
    } catch (error) {
        console.log("error", error)
        response.status(401).json({ error: "Something Went Wrong" });
    }

}


const getAllBlogs = async (request, response) => {
    // console.log("ssssssssssssssss");
    try {
        const blog = await Blog.find();
        if (blog.length === 0) {
            return response.status(400).json("No Data in DB");
        }
        console.log("fffff");
        response.status(200).json(blog)
    } catch (error) {
        console.log("error", error.response);
    }
};
module.exports={
    addBlog,
    getAllBlogs
}