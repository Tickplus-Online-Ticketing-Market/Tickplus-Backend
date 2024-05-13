const User = require("../../models/User");

const createUser = async (req, res) => {
  try {
    // Get the sent in data off request body
    const { username, password, role } = req.body;

    // Create an example with it
    const user = await User.create({
      username,
      password,
      role,
    });

    // Respond with the new example
    res.json({ user });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  createUser,
};
