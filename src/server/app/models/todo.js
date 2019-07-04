const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Number, required: true, default: 0 },
  priority: { type: Number, required: true, default: 1 }
});

module.exports = mongoose.model("Todo", todoSchema);
