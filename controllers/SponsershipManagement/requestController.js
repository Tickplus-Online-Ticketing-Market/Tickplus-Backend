const Request = require("../../models/sponsorrequests");

// retrieve data
const fetchRequests = async (req, res) => {
    try {
        // find the requests
        const requests = await Request.find();
        // Respond with them
        res.json({ requests });
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const fetchRequest = async(req, res) => {
    try {
        // get id from the URL
        const requestId = req.params.id;
        // find the request using that id
        const request = await Request.findById(requestId);
        // respond with the request
        if (request) {
            res.json({ request });
        } else {
            res.status(404).json({ error: "Request not found" });
        }
    } catch (error) {
        console.error("Error fetching request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createRequest = async (req, res) => {
    try {
        // get the sent in data from request body
        const { sponsorName, brandName, sponsorId, budget, email, addNote } = req.body;
        // create a request with it
        const request = await Request.create({
            sponsorName,
            brandName,
            sponsorId,
            budget,
            email,
            addNote,
        });
        // respond with the new request
        res.json({ request });
    } catch (error) {
        console.error("Error creating request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateRequest = async (req, res) => {
    try {
        // get the id from the URL
        const requestId = req.params.id;
        // get the data from the request body
        const { budget, email, addNote } = req.body;
        // find and update the record
        await Request.findByIdAndUpdate(requestId, {
            budget,
            email,
            addNote,
        });
        // find updated request
        const request = await Request.findById(requestId);
        // respond with it
        res.json({ request });
    } catch (error) {
        console.error("Error updating request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteRequest = async (req, res) => {
    try {
        // get id from the URL
        const requestId = req.params.id;
        // delete the record
        await Request.findByIdAndDelete(requestId);
        // respond
        res.json({ success: "Record deleted" });
    } catch (error) {
        console.error("Error deleting request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    fetchRequests,
    fetchRequest,
    createRequest,
    updateRequest,
    deleteRequest,
};
