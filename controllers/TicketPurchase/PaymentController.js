// PaymentController.js

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

// Fetch highest sum of totalCost along with eventId and eventName
const fetchHighestTotalCost = async (req, res) => {
    try {
        const highestTotalCost = await Payments.aggregate([
            {
                $group: {
                    _id: "$eventId",
                    eventName: { $first: "$eventName" },
                    totalCost: { $sum: "$totalCost" }
                }
            },
            {
                $sort: { totalCost: -1 }
            },
            {
                $limit: 1
            }
        ]);

        res.json(highestTotalCost[0]);
    } catch (error) {
        console.error("Error fetching highest total cost:", error);
        res.status(500).json({ error: "Failed to fetch highest total cost." });
    }
};

// Scatter chart
const ScatterChart = async (req, res) => {
    try {
        const countsSum = await Payments.aggregate([
            {
                $group: {
                    _id: "$eventName", // Group by eventName
                    totalCount: { $sum: "$count" }, // Calculate the sum of counts
                    date: { $first: "$date" } // Get the date from the first document in the group
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    eventName: "$_id", // Rename _id to eventName
                    totalCount: 1, // Include totalCount field
                    date: 1 // Include date field
                }
            }
        ]);

        // Send the aggregated data as response
        res.json({ countsSum });
    } catch (error) {
        console.error("Error fetching counts sum by event:", error);
        res.status(500).json({ error: "Failed to fetch counts sum by event." });
    }
};


// Bar Chart
const fetchPaymentsSumByEvent = async (req, res) => {
    try {
        const paymentsSum = await Payments.aggregate([
            {
                $group: {
                    _id: "$eventName",
                    count: { $sum: "$count" }
                }
            }
        ]);
        
        if (paymentsSum.length === 0) {
            return res.json({ paymentsSum: [] });
        }
        
        res.json({ paymentsSum });
    } catch (error) {
        console.error("Error fetching payments sum:", error);
        res.status(500).json({ error: "Failed to fetch payments sum." });
    }
};

module.exports = {
    fetchAllPays,
    createPay,
    fetchHighestTotalCost,
    ScatterChart,
    fetchPaymentsSumByEvent,
};
