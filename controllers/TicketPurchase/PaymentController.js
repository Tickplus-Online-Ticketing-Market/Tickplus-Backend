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
        const { eventname, ticketPrice, count, totalCost, customerName } = req.body;
        const pay = await Payments.create({
            eventname,
            ticketPrice,
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


const fetchHighestTotalCost = async (req, res) => {
    const eventName = req.query.eventname; 
    try {
        const highestTotalCost = await Payments.aggregate([
            {
                $match: { eventname: eventName } 
            },
            {
                $group: {
                    _id: "$eventname",
                    totalCost: { $sum: "$totalCost" }
                }
            }
        ]);

        res.json(highestTotalCost[0]);
    } catch (error) {
        console.error("Error fetching highest total cost by event:", error);
        res.status(500).json({ error: "Failed to fetch highest total cost by event." });
    }
};

// Scatter chart
const ScatterChart = async (req, res) => {
    try {
        const countsSum = await Payments.aggregate([
            {
                $group: {
                    _id: "$eventname", 
                    totalCount: { $sum: "$count" }, 
                    date: { $first: "$date" } 
                }
            },
            {
                $project: {
                    _id: 0, 
                    eventname: "$_id", 
                    totalCount: 1, 
                    date: 1 
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
                    _id: "$eventname",
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
