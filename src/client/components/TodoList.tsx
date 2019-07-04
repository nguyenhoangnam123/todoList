import * as React from "react";
import Todo from "./Todo";

const App = () => {
  const [todo, setTodo] = React.useState({
    _id: "",
    title: "",
    status: 0
  });
  const [action, setAction] = React.useState(0);
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const titleValue = React.createRef<HTMLInputElement>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/todos");
        const json = await response.json();
        setTodos(json);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const actionTodo = async () => {
      console.log("updated todo: ", todo);
      const { _id, title, status } = todo;
      if (_id) {
        switch (action) {
          case 1: {
            await fetch(`/api/${_id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              mode: "cors",
              body: JSON.stringify({ title: title, status: status })
            });
          }
          case 2: {
            await fetch(`/api/${_id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
              mode: "cors"
            });
          }
        }
      }
    };
    actionTodo();
  }, [todo]);

  const handleKeyUp = async (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const node = titleValue.current;
      let createBody = {
        title: "no yet provided todo",
        status: 0
      };
      if (node) {
        createBody.title = node.value;
      }

      try {
        const response = await fetch("/api/todo", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(createBody)
        });
        const data = await response.json();
        setTodos([...todos, data]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateStatusHandler = (id: string) => {
    const targetTodo = todos.find(todo => todo._id == id);
    targetTodo.status = targetTodo.status == 1 ? 0 : 1;
    setAction(1);
    setTodo(targetTodo);
    setTodos([...todos]);
  };

  const updateTitleHandler = (id: string, value: string) => {
    const targetTodo = todos.find(todo => todo._id == id);
    targetTodo.title = value;
    setAction(1);
    setTodo(targetTodo);
  };

  const deleteHandler = (id: string) => {
    const targetTodo = todos.find(todo => todo._id == id);
    setAction(2);
    setTodo(targetTodo);
    setTodos(todos.filter(todo => todo._id != id));
  };

  return (
    <>
      <ul>
        <div className="screen">
          {loading == true
            ? "...Loading"
            : todos.map(({ _id, title, status }: any) => {
                return (
                  <Todo
                    id={_id}
                    title={title}
                    status={status}
                    key={_id}
                    updateStatusHandler={updateStatusHandler}
                    updateTitleHandler={updateTitleHandler}
                    deleteHandler={deleteHandler}
                  />
                );
              })}
        </div>
        <div className="control">
          <input
            type="text"
            placeholder="Add todo here..."
            onKeyPress={handleKeyUp}
            ref={titleValue}
            style={{ textIndent: "10px" }}
          />
        </div>
      </ul>
    </>
  );
};

export default App;
