const express = require("express");
const TicketPurchaseRouter = express.Router();
const TicketsController = require("../controllers/TicketPurchase/TicketsController");
const WishlistController = require("../controllers/TicketPurchase/WishlistController");
const PaymentController = require("../controllers/TicketPurchase/PaymentController");
const RefundController = require("../controllers/TicketPurchase/RefundController");

TicketPurchaseRouter.get("/ticks", TicketsController.fetchAllTickets);
TicketPurchaseRouter.get("/ticks/:id", TicketsController.fetchOneTicket);

TicketPurchaseRouter.get("/wishes",WishlistController.fetchAllWishes);
TicketPurchaseRouter.post("/wishes",WishlistController.createWish);
TicketPurchaseRouter.delete("/wishes/:id",WishlistController.deleteWish);

TicketPurchaseRouter.get("/pays", PaymentController.fetchAllPays);
TicketPurchaseRouter.post("/pays",PaymentController.createPay);
TicketPurchaseRouter.get("/pays/highest-total-cost", PaymentController.fetchHighestTotalCost);
TicketPurchaseRouter.get("/pays/counts-sum-by-event", PaymentController.ScatterChart);
TicketPurchaseRouter.get("/pays/sum-by-event", PaymentController.fetchPaymentsSumByEvent);

TicketPurchaseRouter.get("/refs", RefundController.fetchAllRefunds);
TicketPurchaseRouter.post("/refs", RefundController.createRefund);
TicketPurchaseRouter.put("/refs/:id", RefundController.updateRefund);
TicketPurchaseRouter.delete("/refs/:id", RefundController.deleteRefund);
TicketPurchaseRouter.get("/refs/sum-by-event", RefundController.fetchRefundsSumByEvent);

module.exports = TicketPurchaseRouter;