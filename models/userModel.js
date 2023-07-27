const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = mongoose.Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      pass: { type: String, required: true },
      pic: { type: String, default: "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png" },
   },
   {
      timestamps: true,
   },
);

userModel.methods.matchPassword = async function (enteredpassword) {
   return await bcrypt.compare(enteredpassword, this.pass);
}

userModel.pre("save", async function (next) {
   if (!this.isModified) {
      next();
   }
   const salt = await bcrypt.genSalt(10);
   this.pass = await bcrypt.hash(this.pass, salt);
});
const User = mongoose.model("User", userModel);

module.exports = User;