//projectmodel schema
var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var ProjectSchema = new mongoose.Schema(
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
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
    },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    maintainers: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
    org: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizationModel" },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "BoardModel" }],
  },
  { timestamps: true }
);

ProjectSchema.plugin(mongoosePaginate);
ProjectSchema.index({ name: 1 });

module.exports = mongoose.model("ProjectModel", ProjectSchema);
