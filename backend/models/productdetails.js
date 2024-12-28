const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true,
        min:0
    },

    stock:{
        type:Number,
        required:true,
        min:0
    },

    brand:{
        type:String,
        required:true
    },

    psn:{
        type:String,
        required:true,
        unique:true
    },

    weight:{
        type:Number,
        required:true,
        min:0
    },

    dateAdded:{
        type:Date,
        required:true,
        default:Date.now
    },

    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },

    contact:{
        type:Number,
        required:true,
    },

    description:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Product', ProductSchema);
//module.exports = mongoose.model('Products', ProductSchema);