var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "ProjectModel" },
    waitingforApproval: [
      { type: mongoose.Schema.Types.ObjectId, ref: "TicketModel" },
    ],
    backlog: [{ type: mongoose.Schema.Types.ObjectId, ref: "TicketModel" }],
    design: [{ type: mongoose.Schema.Types.ObjectId, ref: "TicketModel" }],
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "TicketModel" }],
    inprogress: [{ type: mongoose.Schema.Types.ObjectId, ref: "TicketModel" }],
    inreview: [{ type: mongoose.Schema.Types.ObjectId, ref: "TicketModel" }],
    testing: [{ type: mongoose.Schema.Types.ObjectId, ref: "TicketModel" }],
    completed: [{ type: mongoose.Schema.Types.ObjectId, ref: "TicketModel" }],
  },
  { timestamps: true }
);

BoardSchema.plugin(mongoosePaginate);
BoardSchema.index({ name: 1 });

module.exports = mongoose.model("BoardModel", BoardSchema);
