const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

async function connectMongoDB() {
  await mongoose
    .connect(config.url, { useNewUrlParser: true })
    .then(() => console.log("successfully"))
    .catch(err => console.log(err));
}
connectMongoDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import route for app
require("./app/routes/todo.routes")(app);

app.listen(8080, console.log("listening to port 8080"));
