let mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");
let crypto = require("crypto");
let faker = require("faker");
const mongoosePaginate = require("mongoose-paginate-v2");

let UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: false,
      required: [true, "can't be blank"],
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },

    fullName: { type: String, required: [true, "can't be blank"] },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true,
    },

    role: {
      type: Number,
      default: 1, // default 1- User
      enum: [
        1, // 1: user
        2, // 2: Super Admin
        3, // 3: Admin
      ],
    },
    skills: [{ type: String }],
    image: String,

    org: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrganizationModel" }],

    hash: String,
    salt: String,
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("UserModel", UserSchema);
