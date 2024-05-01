const express = require("express");
const TicketPurchaseRouter = express.Router();
const TicketsController = require("../controllers/TicketPurchase/TicketsController");
const WishlistController = require("../controllers/TicketPurchase/WishlistController");
const RefundController = require("../controllers/TicketPurchase/RefundController");
const BankTransferController = require("../controllers/TicketPurchase/BankTransferController");

TicketPurchaseRouter.get("/ticks", TicketsController.fetchAllTickets);
TicketPurchaseRouter.get("/ticks/:id", TicketsController.fetchOneTicket);
TicketPurchaseRouter.post("/ticks", TicketsController.createTicket);

TicketPurchaseRouter.get("/wishes", WishlistController.fetchAllWishes);
TicketPurchaseRouter.get("/wishes/:id", WishlistController.fetchOneWish);
TicketPurchaseRouter.post("/wishes", WishlistController.createWish);
TicketPurchaseRouter.delete("/wishes/:id", WishlistController.deleteWish);

TicketPurchaseRouter.get("/refs", RefundController.fetchAllRefunds);
TicketPurchaseRouter.post("/refs", RefundController.createRefund);
TicketPurchaseRouter.put("/refs/:id", RefundController.updateRefund);
TicketPurchaseRouter.delete("/refs/:id", RefundController.deleteRefund);

TicketPurchaseRouter.get("/bts", BankTransferController.getAllBankTransfers);
TicketPurchaseRouter.get("/bts/:id", BankTransferController.getBankTransferById);
TicketPurchaseRouter.post("/bts", BankTransferController.createBankTransfer);

module.exports = TicketPurchaseRouter;