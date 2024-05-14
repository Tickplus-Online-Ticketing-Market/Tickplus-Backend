const mongoose = require("mongoose");

const paySchema = new mongoose.Schema({
    eventId: String,
    eventName: String,
    unitPrice: Number,
    count: Number,
    totalCost: Number,
    customerName: String,
    time: { 
        type: String, 
        default: () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`; // Assuming current time to end of day
        }
    },
    date: { 
        type: String, 
        default: () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
            const year = String(now.getFullYear());
            return `${day}/${month}/${year}`;
        }
    }
});

const Payments = mongoose.model('Purchase', paySchema);

module.exports = Payments;
