const express = require("express");
const Refunds = require("../../models/Refunds");

const fetchAllRefunds = async (req, res) => {
    try {
        const allRefunds = await Refunds.find();
        res.json({ refunds: allRefunds });
    } catch (error) {
        console.error("Error fetching all refunds:", error);
        res.status(500).json({ error: "Failed to fetch refunds. Please try again later." });
    }
};

const fetchOneRefund = async (req, res) => {
    try {
        const refundId = req.params.id;
        const refund = await Refunds.findById(refundId);
        if (!refund) {
            return res.status(404).json({ error: "Refund not found" });
        }
        res.json({ refund });
    } catch (error) {
        console.error("Error fetching refund:", error);
        res.status(500).json({ error: "Failed to fetch refund" });
    }
};

const createRefund = async (req, res) => {
    try {
        const { customerName, eventName, eventId, unitPrice, count, totalCost, email, mobile, reason } = req.body;
        const refund = await Refunds.create({
            customerName,
            eventName,
            eventId,
            unitPrice,
            count,
            totalCost,
            email,
            mobile,
            reason,
        });
        res.json({ refund });
    } catch (error) {
        console.error("Error creating refund:", error);
        res.status(500).json({ error: "Failed to create refund. Please try again later." });
    }
};

const updateRefund = async (req, res) => {
    try {
        const refundId = req.params.id;
        const { customerName, eventName, eventId, unitPrice, count, totalCost, email, mobile, reason } = req.body;
        const updatedRefund = await Refunds.findByIdAndUpdate(refundId, {
            customerName,
            eventName,
            eventId,
            unitPrice,
            count,
            totalCost,
            email,
            mobile,
            reason,
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
        res.status(500).json({ error: "Failed to delete refund. Please try again later." });
    }
};

module.exports = {
    fetchAllRefunds,
    fetchOneRefund,
    createRefund,
    updateRefund,
    deleteRefund,
};
