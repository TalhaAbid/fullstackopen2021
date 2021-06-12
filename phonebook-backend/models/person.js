const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const url = process.env.MONGODB_URI;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("sucessful connection");
  })
  .catch((error) => {
    console.log("an error occures", error.message);
  });

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    unique: true,
  },
  number: {
    type: String,
    minLength: 8,
  },
});
personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
