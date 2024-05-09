const RequestM = require("../../models/RequestModel.js");
const { upload } = require("./utils/multer.js");
const path = require("path");

const getAllRequest = async (req, res, next) => {
  let reques;
  // Get all Request
  try {
    reques = await RequestM.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!reques) {
    return res.status(404).json({ message: "Request not found" });
  }
  // Display all reques
  return res.status(200).json({ reques });
};

// Controller function to handle file upload
const uploadFile = (req, res, next) => {
  const userId = req.params.id;

  // Wrap the upload middleware in a Promise
  const uploadPromise = new Promise((resolve, reject) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.log(err);
        reject(new Error("Unable to upload file"));
      } else {
        resolve(req.file.filename);
      }
    });
  });

  // Handle the upload promise
  uploadPromise
    .then((filename) => {
      const fileUrl = path.join(filename);
      console.log(filename);

      // Update user's profile pic in the database
      return RequestM.updateOne(
        { _id: userId },
        { $set: { profilePicture: fileUrl } }
      );
    })
    .then(() => {
      res.json({
        status: "ok",
        message: "File uploaded successfully",
        filename: filename,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};


// data Insert
const addRequest = async (req, res, next) => {
  const { name, phone, message, status, onstatus, code } = req.body;

  let reques;

  try {
    reques = new RequestM({
      name,
      phone,
      message,
      status,
      onstatus,
      code,
    });
    await reques.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add Request" });
  }

  return res.status(200).json({ reques });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let reques;

  try {
    reques = await RequestM.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available requess
  if (!reques) {
    return res.status(404).json({ message: "Request Not Found" });
  }
  return res.status(200).json({ reques });
};

//Update reques Details
const updateRequest = async (req, res, next) => {
  const id = req.params.id;
  const { name, phone, message, status, onstatus, code } = req.body;

  let requess;

  try {
    requess = await RequestM.findByIdAndUpdate(id, {
      name: name,
      phone: phone,
      message: message,
      status: status,
      onstatus: onstatus,
      code: code,
    });
    requess = await requess.save();
  } catch (err) {
    console.log(err);
  }
  if (!requess) {
    return res
      .status(404)
      .json({ message: "Unable to Update Request Details" });
  }
  return res.status(200).json({ requess });
};

//Delete reques Details
const deleteRequest = async (req, res, next) => {
  const id = req.params.id;

  let reques;

  try {
    reques = await RequestM.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!reques) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Request Details" });
  }
  return res.status(200).json({ reques });
};

exports.getAllRequest = getAllRequest;
exports.addRequest = addRequest;
exports.getById = getById;
exports.updateRequest = updateRequest;
exports.deleteRequest = deleteRequest;
exports.uploadFile = uploadFile;
