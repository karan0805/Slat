var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    board_id: { type: mongoose.Schema.Types.ObjectId, ref: "BoardModel" },
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "CommentModel" }],
    status: {
      type: String,
      enum: ["open", "in progress", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    skills: { type: [String], default: [] },
    type: {
      type: String,
      enum: ["bug", "feature", "task"],
      default: "bug",
    },
    dueDate: { type: Date },
    completedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

TicketSchema.plugin(mongoosePaginate);
TicketSchema.index({ name: 1 });

module.exports = mongoose.model("TicketModel", TicketSchema);
