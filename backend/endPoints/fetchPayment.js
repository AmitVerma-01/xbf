const Razorpay = require("razorpay");

const fetchPayment = async (req, res, next) => {
    const instance = new Razorpay({ key_id: process.env.RAZORPAY_API_ID, key_secret: process.env.RAZORPAY_API_KEY });
    try {
        const order = await instance.orders.fetch(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = fetchPayment