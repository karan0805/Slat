var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["meeting", "holiday", "custom"],
      default: "meeting",
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    org: { type: mongoose.Schema.Types.ObjectId, ref: "OrgModel" },
    allDay: { type: Boolean, default: true },
  },
  { timestamps: true }
);

EventSchema.plugin(mongoosePaginate);
EventSchema.index({ name: 1 });

module.exports = mongoose.model("EventModel", EventSchema);
