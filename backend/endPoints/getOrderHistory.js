const Order = require("../schema/order");


const getOrderHistory = async (req, res) => {
    try {
        const orderHistory = await Order.find({ user: req.userID }).sort({
            createdAt: -1,
        });
        res.status(200).json(orderHistory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getOrderHistory