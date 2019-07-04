const mongoose = require("mongoose");
const config = require("./config");

async function connectMongoDB() {
  await mongoose
    .connect(config.url, { useNewUrlParser: true })
    .then(() => console.log("successfully"))
    .catch(err => console.log(err));
}
connectMongoDB();

const Schema = mongoose.Schema;
const todoSchema = new Schema({
  title: { type: String, required: true },
  status: { type: Number, required: true, default: 0 }
});

const todo = mongoose.model("Todo", todoSchema);

// todo
//   .create({
//     title: "third todo",
//     status: 0
//   })
//   .then(() => console.log("created new todo"))
//   .catch(err => console.log(err));

/*
***
find All todos 
***
*/
todo
  .find({})
  .then(todos => todos.map(todo => console.log(todo)))
  .catch(err => console.log(err));

/*
***
find by Id, with Object Id 
***
*/
// todo
//   .findById({ _id: "5cfa94bb7c8f6c02e1f78677" })
//   .then(todo => console.log(todo))
//   .catch(err => console.log(err));

/*
***
find by Id, with Object Id and update status 
***
*/
// todo
//   .findByIdAndUpdate({ _id: "5cfa94bb7c8f6c02e1f78677" }, { status: 1 })
//   .then(todo => console.log(todo))
//   .catch(err => console.log(err));

/*
***
find by Id, with Object Id and delete 
***
*/
// todo
//   .findByIdAndDelete({ _id: "5cfa94bb7c8f6c02e1f78677" })
//   .then(() => console.log("todo is removed"))
//   .catch(err => console.log(err));
