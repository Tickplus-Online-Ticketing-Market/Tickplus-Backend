const Wishes = require("../../models/Wishes")

//Fetch all wishes
const fetchAllWishes = async (req, res) => {
    try{
        const allWishes = await Wishes.find();
        res.json({ wishes: allWishes });
    }catch(error){
        console.error("Error fetching:", error);
        res.status(500).json({error: "Failed to fetch."})
    }
};

//Fetch one wish
const fetchOneWish = async (req, res) => {
    try {
        const wishId = req.params.id;
        const wish = await Wishes.findById(wishId);
        if (!wish) {
            return res.status(404).json({ error: "Wish not found" });
        }
        res.json({ wish });
    } catch (error) {
        console.error("Error fetching wish:", error);
        res.status(500).json({ error: "Failed to fetch wish" });
    }
};

// Create a wish
const createWish = async (req, res) => {
    try {
        const { eventId, eventName, unitPrice } = req.body;
        const wish = await Wishes.create({
            eventId,
            eventName,
            unitPrice
        });
        res.json({ wish });
    } catch (error) {
        console.error("Error creating refund:", error);
        res.status(500).json({ error: "Failed to create" });
    }
};


//Delete a Wish
const deleteWish = async (req, res) => {
    try {
        const wishId = req.params.id;
        const deletedWish = await Wishes.findByIdAndDelete(wishId);
        if (!deletedWish) {
            return res.status(404).json({ error: "Wish not found" });
        }
        res.json({ success: "Wish record deleted successfully" });
    } catch (error) {
        console.error("Error deleting wish:", error);
        res.status(500).json({ error: "Failed to delete." });
    }
};

module.exports = {
    fetchAllWishes,
    fetchOneWish,
    createWish,
    deleteWish,
}