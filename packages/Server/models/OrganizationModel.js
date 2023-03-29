var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var OrganizationSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      lowercase: false,
      required: [true, "can't be blank"],
      trim: true,
      index: true,
      sparse: true,
    },
    orgDesc: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProjectModel" }],
    canDelete: { type: Boolean, default: true },
  },
  { timestamps: true }
);

OrganizationSchema.plugin(mongoosePaginate);

OrganizationSchema.index({ owner: 1 });

module.exports = mongoose.model("OrganizationModel", OrganizationSchema);
