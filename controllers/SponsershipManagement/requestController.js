const SponserRequest = require("../../models/sponsorrequests");

// retrieve data
const fetchRequests = async (req, res) => {
    try {
        // find the requests
        const requests = await SponserRequest.find();
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
        const request = await SponserRequest.findById(requestId);
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

const fetchUpdatedStatus = async (req, res) => {
    try{
        const sponsorrequests =  await SponserRequest.find({ status: "published"});

        res.json({ sponsorrequests });
    }catch (error) {
        console.error("Error fetching staus:", error);
        res.status(500).json({ error: "failed fetch status" });
    }
}

const createRequest = async (req, res) => {
    try {
        // get the sent in data from request body
        const { sponsorName, brandName, sponsorId, budget, email, addNote, name, _id, venue, date, artist, time } = req.body;
        // create a request with it
        const request = await SponserRequest.create({
            sponsorName,
            brandName,
            sponsorId,
            budget,
            email,
            addNote,
            eventName:name,
            eventId:_id,
            venue,
            date,
            artists:artist,
            time,
            status: "Pending"

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
        const { email, addNote } = req.body;
        // find and update the record
        await SponserRequest.findByIdAndUpdate(requestId, {
            email,
            addNote,
            
        });
        // find updated request
        const request = await SponserRequest.findById(requestId);
        // respond with it
        res.json({ request });
    } catch (error) {
        console.error("Error updating request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateStatusAccept = async (req,res) => {
    try{
        const requestId = req.params.id;
        const status = { status: "Accepted",};

    await SponserRequest.findByIdAndUpdate(requestId, status);
    const sponsorrequests= await SponserRequest.findById(requestId);
    res.json({ sponsorrequests});
    }catch (error) {
        console.error("Error updating status", error);
        res
            .status(500)
            .json({ error:"Failed to update the status", details: error.message});
    }
    
};

const updateStatusReject = async (req,res) => {
    try{
        const requestId = req.params.id;
        const status = { status: "Rejected",};

    await SponserRequest.findByIdAndUpdate(requestId, status);
    const sponsorrequests= await SponserRequest.findById(requestId);
    res.json({ sponsorrequests});
    }catch (error) {
        console.error("Error updating status", error);
        res
            .status(500)
            .json({ error:"Failed to update the status", details: error.message});
    }
    
};

const deleteRequest = async (req, res) => {
    try {
        // get id from the URL
        const requestId = req.params.id;
        // delete the record
        await SponserRequest.findByIdAndDelete(requestId);
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
    fetchUpdatedStatus,
    updateStatusAccept,
    updateStatusReject,
};
