const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    refTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    orderHistory: [
        { 
            products: [
                { 
                    productId: Number,
                    productName : String,
                    price : Number,
                    quantity : Number,
                    size : String
                 }
            ],
            amount: { type: Number, default: 0 },
            date: { type: Date, default: Date.now },
            status: { type: String, default: "Pending" },
            paymentMethod : { type: String, default: "COD" },
            paymentId: { type: String, default: "" },
            address: { type: String, default: "" },
        }
    ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;