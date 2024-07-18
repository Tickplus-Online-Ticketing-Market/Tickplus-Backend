const Report = require("../../models/EventLaunchingReport");


// Get temp_count
const getTemplateCount = async (req, res, next) => {
  try {
    const report = await Report.findOne({ user_id: req.params.id });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    return res.status(200).json({ temp_count: report.temp_count });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update temp_count
const updateTemplateCount = async (req, res, next) => {
  try {
    let report = await Report.findOne({ user_id: req.params.id });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    report.temp_count = (report.temp_count || 0) + 1; // Increment temp_count by 1
    await report.save(); // Save the changes to the database
    return res.status(200).json({ temp_count: report.temp_count });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get req_count
const getRequestCount = async (req, res, next) => {
  try {
    const report = await Report.findOne({ user_id: req.params.id });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    return res.status(200).json({ req_count: report.req_count });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update req_count
const updateRequestCount = async (req, res, next) => {
  try {
    let report = await Report.findOne({ user_id: req.params.id });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    report.req_count = (report.req_count || 0) + 1; // Increment temp_count by 1
    await report.save(); // Save the changes to the database
    return res.status(200).json({ req_count: report.req_count });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update  existing Request Count

// const updateRequestCount = async (req, res, next) => {
   
//     const { reqcount } = req.body;
//     try {
//       const report = await Report.findAndUpdate( // Find and update the request count
//         id,
//         { reqcount },   // New request count
//         { new: true }   // Return the updated request count
//       );
//       if (!report) {
//         return res.status(404).json({ message: "Report not found" });
//       }
//       return res.status(200).json({ report });  // Return the updated event
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };


// const getRequestCount = async (req, res, next) => {
//   let report;
//   try {
//     report = await Report.find();                    // Find  request count in the database
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
//   // Check if no events were found

//   if (!report || report.length === 0) {
//     return res.status(404).json({ message: "No report counts found" });
//   }
//   return res.status(200).json({ report });          // Return the found events
// };



module.exports = {
    getTemplateCount,
    getRequestCount,
    updateTemplateCount,
    updateRequestCount,
 
};
