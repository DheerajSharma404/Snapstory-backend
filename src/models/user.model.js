import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ServerConfig } from "../config/index.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  const encryptedPassword = bcrypt.hashSync(
    user.password,
    Number(ServerConfig.SALT_ROUND)
  );
  user.password = encryptedPassword;
  next();
});

UserSchema.methods.comparePassword = function compare(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function generate() {
  return jwt.sign(
    { id: this._id, username: this.username },
    ServerConfig.JWT_SECRET,
    // { expiresIn: ServerConfig.JWT_EXPIRES_IN }
  );
};

const User = mongoose.model("User", UserSchema);

export default User;
