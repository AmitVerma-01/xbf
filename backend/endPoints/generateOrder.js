const { default: axios } = require("axios");
const Razorpay = require("razorpay");

const generateOrder = async (req, res) => {
    const { amount, email, userID, notes } = req.body;
    console.log("Body: ",req.body);
    
    const order = {
        amount: amount * 100, // Convert to smallest currency unit
        currency: "INR",
        receipt: "receipt#1",
        partial_payment: false,
        notes: {
            username: email,
            userId: userID,
            productName: notes?.productName || [],
            productId: notes?.productId || []
        }
    };
    try {
    const instance  = new Razorpay({ key_id: process.env.RAZORPAY_API_ID, key_secret: process.env.RAZORPAY_API_KEY })
        const orderResponse = await instance.orders.create(order)
        console.log(orderResponse); // Log the response data for debugging

        res.status(201).json(orderResponse); // Return only the response data
    } catch (error) {
        console.error("Error generating order:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = generateOrder;
