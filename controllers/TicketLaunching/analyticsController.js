const Ticketfoam = require("../../models/ticketfoam");

const getTicketCountsByEventname = async (req, res) => {
  try {
    const ticketCounts = await Ticketfoam.aggregate([
      {
        $group: {
          _id: { eventname: "$eventname", ticketMode: "$ticketMode" },
          totalQuantity: { $sum: { $toInt: "$ticketQuantity" } },
        },
      },
      {
        $group: {
          _id: "$_id.eventname",
          tickets: {
            $push: {
              ticketMode: "$_id.ticketMode",
              totalQuantity: "$totalQuantity",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          eventname: "$_id",
          vip: {
            $reduce: {
              input: "$tickets",
              initialValue: 0,
              in: {
                $cond: {
                  if: { $eq: ["$$this.ticketMode", "vip"] },
                  then: { $add: ["$$value", "$$this.totalQuantity"] },
                  else: "$$value",
                },
              },
            },
          },
          normal: {
            $reduce: {
              input: "$tickets",
              initialValue: 0,
              in: {
                $cond: {
                  if: { $eq: ["$$this.ticketMode", "normal"] },
                  then: { $add: ["$$value", "$$this.totalQuantity"] },
                  else: "$$value",
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          vip: { $ifNull: ["$vip", 0] },
          normal: { $ifNull: ["$normal", 0] },
        },
      },
    ]);

    res.json({ ticketCounts });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTicketCountsByEventname };
