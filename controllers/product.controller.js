const Products = require("../models/products.model");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const addProduct = async (request, response) => {
    console.log("wwwwww");
    const { name, details,image,usage,companyAvailable,pros,cons  } = request.body;
    console.log("body", request.body);

    const user = request.user; //accessing user from authorization
    const userType = user.userType
    console.log("usertpeee", userType)

    try {
        if (userType === "Admin") {


            if (!request.body.name || !request.body.details) {
                return response.status(400).json({ error: "Add title and price" });
            }
            const product = new Products({
                 name,details,image,usage,companyAvailable,pros,cons
            });
            product.save();
            response.status(201).json(product);
            console.log("product created");
        } else {
            response.status(401).json("invalid Access...!!!")
        }
    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Something Went Wrong" });
    }


};

const getAllProducts = async (request, response) => {
    // console.log("ssssssssssssssss");
    try {
        const product = await Products.find();
        if (product.length === 0) {
            return response.status(400).json("No Data in DB");
        }
        console.log("fffff");
        response.status(200).json(product)
    } catch (error) {
        console.log("error", error.response);
    }
};

const updateProduct = async (request, response) => {
    console.log("llllll")
    const _id = request.params.id;
    console.log(_id);
    const data = request.body;

    const user = request.user;  //accessing user from authorization
    const userType = user.userType
    console.log("usertpeee", userType)
    try {
        if (userType === "Admin") {
            const product = await Products.findByIdAndUpdate(
                { _id: _id },
                { $set: data },
                { new: true });
            if (!product) {
                return response.status(404).json("product not found");
            }
            return response.status(200).json(product);
        } else {
            response.status(401).json("invalid Access...!!!")
        }
    } catch (error) {
        console.log("error", error);
    }
}

const deleteProduct = async (request, response) => {
    console.log("ffff");
    const _id = request.params.id;

    const user = request.user;  //accessing user from authorization
    const userType = user.userType
    console.log("usertpeee", userType)
    try {
        if (userType === "Admin") {
            const product = await Products.findByIdAndDelete({ _id });
            if (!product) {
                return response.status(404).json("product not exist");
            }
            response.status(200).json(product);
        } else {
            response.status(401).json("invalid Access...!!!")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}