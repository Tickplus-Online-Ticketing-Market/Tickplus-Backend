const Request = require("../../models/sponsorrequests");

// retrieve data
const fetchRequests = async (req, res) => {
    //find the requests
    const requests = await Request.find()
    //Respond with them
    res.json({ requests });

};

const fetchRequest = async(req, res) => {
    //get id off the url
    const requestId = req.params.id;
    //find the request using that url
    const request = await Request.findById(requestId)
    //respond with the request
    res.json({ request })
};

const createRequest = async (req, res) => {
    //get the sent in data off request body
    const { sponsorName, brandName, sponsorId, budget, email, addNote } = req.body;

    //create a request with it
    const request = await Request.create({
        sponsorName,
        brandName,
        sponsorId,
        budget,
        email,
        addNote,
    });

    //respond with the new note
    res.json({ request });
};

const updateRequest = async (req, res) => {
    // get the id off the url
    const requestId = req.params.id;
 
    //get the data off the request body
    const {  budget, email, addNote } = req.body;
 
    //find and update the record
    await Request.findByIdAndUpdate(requestId, {
     budget,
     email,
     addNote,
    });
 
    //find updated note
    const request = await Request.findById(requestId);
 
    //respond with it
    res.json({ request });
 };

 const deleteRequest = async (req, res) => {
    //get id off the url
    const requestId = req.params.id;

    //delete the record
    await Request.findByIdAndDelete( requestId );

    //respond
    res.json({success: "Record deleted" });
};

module.exports = {
    fetchRequests,
    fetchRequest,
    createRequest,
    updateRequest,
    deleteRequest,
}