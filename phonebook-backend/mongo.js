const mongoose = require("mongoose");
if (process.argv.length < 3) {
  console.log(
    "provide password as argument node mongo.js <password> optional <name> <number>"
  );
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://talha:${password}@cluster0.hoowq.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}
if(process.argv.length === 5){
    let entry = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    entry.save().then(result => {
        console.log(`added ${result.name} ${result.number} to phonebook`);
        mongoose.connection.close();
        process.exit(1);
    })
}
