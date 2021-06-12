const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.plugin(mongooseUniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //delete the password hash
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
