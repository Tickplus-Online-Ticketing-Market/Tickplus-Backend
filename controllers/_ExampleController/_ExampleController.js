const Example = require("../../models/_ExapmleModel");

const createExample = async (req, res) => {
  try {
    // Get the sent in data off request body
    const { title, body } = req.body;

    // Create an example with it
    const example = await Example.create({
      title,
      body,
    });

    // Respond with the new example
    res.json({ example });
  } catch (error) {
    res.json({ error });
  }
};

const retrieveExample = async (req, res) => {
  try {
    // get id from url
    const exampleId = req.params.id;

    // Find the example using id
    const example = await Example.findById(exampleId);

    // Respond with the example
    res.json({ example });
  } catch (error) {
    res.json({ error });
  }
};

const updateExample = async (req, res) => {
  try {
    // get id from url
    const exampleId = req.params.id;

    // Get the sent in data off request body
    const { title, body } = req.body;

    // Find the example using id & update
    await Example.findByIdAndUpdate(exampleId, {
      title,
      body,
    });

    // Find updated example
    const example = await Example.findById(exampleId);

    // Respond with the updated example
    res.json({ example });
  } catch (error) {
    res.json({ error });
  }
};

const deleteExample = async (req, res) => {
  try {
    // get id from url
    const exampleId = req.params.id;

    // Find the example using id & delete it
    const example = await Example.findByIdAndDelete(exampleId);

    // Respond with the example
    res.json({ example });
  } catch (error) {
    res.json({ error });
  }
};

const retrieveAllExamples = async (req, res) => {
  // Find the examples
  const examples = await Example.find();
  // Respond with them
  res.json({ examples });
};

module.exports = {
  createExample,
  retrieveExample,
  updateExample,
  deleteExample,
  retrieveAllExamples,
};
