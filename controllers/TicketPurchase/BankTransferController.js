const BankTransfer = require('../../models/BankTransfers');

// Create a new bank transfer record
const createBankTransfer = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'File is required!' });
        }
        const newBankTransfer = await BankTransfer.create({ file: req.file.filename });
        res.status(201).json(newBankTransfer);
    } catch (error) {
        console.error("Error creating bank transfer:", error);
        res.status(500).json({ message: "Error creating bank transfer" });
    }
};

// Get all bank transfer records
const getAllBankTransfers = async (req, res) => {
    try {
        const bankTransfers = await BankTransfer.find();
        res.status(200).json(bankTransfers);
    } catch (error) {
        console.error("Error fetching bank transfers:", error);
        res.status(500).json({ message: "Error fetching bank transfers" });
    }
};

// Get a single bank transfer record by ID
const getBankTransferById = async (req, res) => {
    try {
        const bankTransfer = await BankTransfer.findById(req.params.id);
        if (!bankTransfer) {
            return res.status(404).json({ message: 'Bank transfer not found' });
        }
        res.status(200).json(bankTransfer);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error fetching bank transfer" });
    }
};

module.exports = {
    createBankTransfer,
    getAllBankTransfers,
    getBankTransferById
};
