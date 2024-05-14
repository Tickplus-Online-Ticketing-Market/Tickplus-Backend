const Payments = require('../../models/Payments');

// Fetch all payments
const fetchAllPays = async (req, res) => {
    try {
        const allPays = await Payments.find();
        res.json({ pays: allPays });
    } catch (error) {
        console.error("Error fetching:", error);
        res.status(500).json({ error: "Failed to fetch." })
    }
};

// Create a new payment
const createPay = async (req, res) => {
    try {
        const { eventId, eventName, unitPrice, count, totalCost, customerName } = req.body;
        const pay = await Payments.create({
            eventId,
            eventName,
            unitPrice,
            count,
            totalCost,
            customerName
        });
        res.json({ pay });
    } catch (error) {
        console.error("Error creating payment:", error);
        res.status(500).json({ error: "Failed to create payment." });
    }
};

module.exports = {
    fetchAllPays,
    createPay,
};
