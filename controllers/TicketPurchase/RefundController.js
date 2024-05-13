const Refunds = require("../../models/Refunds");

// Fetch all records
const fetchAllRefunds = async (req, res) => {
    try {
        const allRefunds = await Refunds.find();
        res.json({ refunds: allRefunds });
    } catch (error) {
        console.error("Error fetching all refunds:", error);
        res.status(500).json({ error: "Failed to fetch refunds. Please try again later." });
    }
};
// Fetch one record by ID
const fetchOneRefund = async (req, res) => {
    try {
        const refundId = req.params.id;
        const refund = await Refunds.findById(refundId);
        if (!refund) {
            return res.status(404).json({ error: "Refund not found" });
        }
        res.json({ refund });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Failed to fetch refund" });
    }
};

// Create a record
const createRefund = async (req, res) => {
    try {
        const { event, tCode, email, mobile, reason } = req.body;
        const refund = await Refunds.create({
            event,
            tCode,
            email,
            mobile,
            reason
        });
        res.json({ refund });
    } catch (error) {
        console.error("Error creating refund:", error);
        res.status(500).json({ error: "Failed to create refund. Please try again later." });
    }
};

// Update a record
const updateRefund = async (req, res) => {
    try {
        const refundId = req.params.id;
        const { event, tCode, email, mobile, reason } = req.body;
        const updatedRefund = await Refunds.findByIdAndUpdate(refundId, {
            event,
            tCode,
            email,
            mobile,
            reason
        }, { new: true });
        if (!updatedRefund) {
            return res.status(404).json({ error: "Refund not found" });
        }
        res.json({ updatedRefund });
    } catch (error) {
        console.error("Error updating refund:", error);
        res.status(500).json({ error: "Failed to update refund. Please try again later." });
    }
};

// Delete a record
const deleteRefund = async (req, res) => {
    try {
        const refundId = req.params.id;
        const deletedRefund = await Refunds.findByIdAndDelete(refundId);
        if (!deletedRefund) {
            return res.status(404).json({ error: "Refund not found" });
        }
        res.json({ success: "Refund record deleted successfully" });
    } catch (error) {
        console.error("Error deleting refund:", error);
        res.status(500).json({ error: "Failed to delete." });
    }
};

module.exports = {
    fetchAllRefunds,
    fetchOneRefund,
    createRefund,
    updateRefund,
    deleteRefund,
};