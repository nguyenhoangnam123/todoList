const Todo = require("../models/todo");

// create new todo
exports.create = (req, res) => {
  const { title, priority } = req.body;
  // validate title
  if (!title && !priority) {
    return res.status(400).send({ message: "todo title is empty" });
  }

  Todo.create({
    title: title,
    status: 0,
    priority: 2
  })
    .then(todo => res.send(todo))
    .catch(err => console.log(err));
};

// find all todos
exports.findAll = (req, res) => {
  Todo.find({})
    .then(todos => res.send(todos))
    .catch(err => console.log(err));
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const { title, status, priority } = req.body;

  if (!id && !title && !status && !priority) {
    return res.status(400).send({ message: "todo is not valid" });
  }

  Todo.findByIdAndUpdate(
    { _id: id },
    { status: status, title: title, priority: priority }
  )
    .then(todo => console.log(todo))
    .catch(err => console.log(err));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ message: "todo is not valid" });
  }

  Todo.findByIdAndDelete({ _id: id })
    .then(todo => console.log(todo))
    .catch(err => console.log(err));
};
