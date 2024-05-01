const Wishlist = require("../../models/Wishlist");

// Fetch all wishes
const fetchAllWishes = async (req, res) => {
    try {
        const allWishes = await Wishlist.find();
        res.json({ Wishlist: allWishes });
    } catch (error) {
        console.error("Error fetching all wishes:", error);
        res.status(500).json({ error: "Failed to fetch all wishes. Please try again later." });
    }
};

// Fetch one wish by ID
const fetchOneWish = async (req, res) => {
    try {
        const wishId = req.params.id;
        const wish = await Wishlist.findById(wishId);
        if (!wish) {
            return res.status(404).json({ error: "Wish not found" });
        }
        res.json({ Wishlist: wish });
    } catch (error) {
        console.error("Error fetching wish:", error);
        res.status(500).json({ error: "Failed to fetch the wish. Please try again later." });
    }
};

// Create a new wish
const createWish = async (req, res) => {
    try {
        const { eventId, eventName, totalCost } = req.body;
        if (!eventId || !eventName || !totalCost) {
            return res.status(400).json({ error: "Missing eventId, eventName, or totalCost in request body" });
        }
        const wishlist = await Wishlist.create({
            eventId,
            eventName,
            totalCost
        });
        res.status(201).json({ Wishlist: wishlist });
    } catch (error) {
        console.error("Error creating wish:", error);
        res.status(500).json({ error: "Failed to create the wish. Please try again later." });
    }
};

// Delete a wish by ID
const deleteWish = async (req, res) => {
    try {
        const wishId = req.params.id;
        const deletedWish = await Wishlist.findByIdAndDelete(wishId);
        if (!deletedWish) {
            return res.status(404).json({ error: "Wish not found" });
        }
        res.json({ success: "Record Deleted" });
    } catch (error) {
        console.error("Error deleting wish:", error);
        res.status(500).json({ error: "Failed to delete the wish. Please try again later." });
    }
};

module.exports = {
    fetchAllWishes,
    fetchOneWish,
    createWish,
    deleteWish,
};
