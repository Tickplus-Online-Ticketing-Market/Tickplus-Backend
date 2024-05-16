const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  contactnumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  role: { type: String, required: true }
});

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password along with our new salt
    const hash = await bcrypt.hash(user.password, salt);
    // Override the cleartext password with the hashed one
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
