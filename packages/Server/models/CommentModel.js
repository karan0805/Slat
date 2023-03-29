var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: "TicketModel" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  },
  { timestamps: true }
);

CommentSchema.plugin(mongoosePaginate);
CommentSchema.index({ name: 1 });

module.exports = mongoose.model("CommentModel", CommentSchema);
