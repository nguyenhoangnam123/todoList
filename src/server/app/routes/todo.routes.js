module.exports = app => {
  const todoController = require("../controllers/todo.controller");
  app.post("/api/todo", todoController.create);
  app.get("/api/todos", todoController.findAll);
  app.put("/api/:id", todoController.update);
  app.delete("/api/:id", todoController.delete);
};
