const mongoose=require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema(
    {
        name:{
            type:String,
        },
        details:{
             type : String,
        },
        image : {
            type:String,
        },
        usage:{
           type:String
        },
        companyAvailable:{
            type :String,
        },
        pros:{
            type: String,
        },
        cons:{
            type:String,
        },
    },
    {timestamps : true}
)

const Products = mongoose.model("Products",productSchema);
module.exports = Products;