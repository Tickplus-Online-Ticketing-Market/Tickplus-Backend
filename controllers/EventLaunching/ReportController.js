const Event = require("../../models/Report");
// Get all report counts

const getTemplateCount = async (req, res, next) => {
  let report;
  try {
    report = await Report.find();                    // Find template count in the database
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
  // Check if no events were found

  if (!report || report.length === 0) {
    return res.status(404).json({ message: "No report counts found" });
  }
  return res.status(200).json({ report });          // Return the found events
};

const getRequestCount = async (req, res, next) => {
    let report;
    try {
      report = await Report.find();                    // Find  request count in the database
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    // Check if no events were found
  
    if (!report || report.length === 0) {
      return res.status(404).json({ message: "No report counts found" });
    }
    return res.status(200).json({ report });          // Return the found events
  };


// Update  existing template count

const updateTemplateCount = async (req, res, next) => {
    const { id } = req.body;
    try {
      let report = await Report.findById(id);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      report.tempcount = (report.tempcount || 0) + 1; // Increment tempcount
      report = await report.save(); // Save the updated report
      return res.status(200).json({ report });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Update  existing Request Count

const updateRequestCount = async (req, res, next) => {
   
    const { reqcount } = req.body;
    try {
      const report = await Report.findAndUpdate( // Find and update the request count
        id,
        { reqcount },   // New request count
        { new: true }   // Return the updated request count
      );
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      return res.status(200).json({ report });  // Return the updated event
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  


module.exports = {
    getTemplateCount,
    getRequestCount,
    updateTemplateCount,
    updateRequestCount,
 
};
