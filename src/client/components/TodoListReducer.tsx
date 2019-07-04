import * as React from "react";
import TodoReducer from "./TodoReducer";

interface todo {
  _id: string;
  title: string;
  status: number;
  priority: number;
}

interface ToDoList {
  todos: todo[];
  title: string;
  filter: "all" | "incomplete" | "completed";
  sortBy: string;
  sortReverse: true;
  trash: todo[];
  option: "";
}

type ActionType =
  | { type: "addTodo"; todo: todo }
  | { type: "updatePriority"; value: number; id: string }
  | { type: "deleteTodo"; id: string }
  | { type: "loadAllTodos"; todos: todo[] }
  | { type: "updateStatus"; id: string; status: number }
  | { type: "updateSort"; value: string };

const TodoListReducer = () => {
  const inputRef = React.useRef<HTMLInputElement>();

  const initialState: ToDoList = {
    todos: [
      {
        _id: "abc",
        title: "test",
        status: 0,
        priority: 1
      }
    ],
    filter: "all",
    sortBy: "normal",
    sortReverse: true,
    trash: [],
    title: "",
    option: ""
  };

  React.useEffect(() => {
    const loadTodos = async () => {
      const response = await fetch("/api/todos");
      const todos: todo[] = await response.json();
      dispatch({ type: "loadAllTodos", todos: todos });
      dispatch({ type: "deleteTodo", id: "abc" });
    };
    loadTodos();
  }, []);

  const [state, dispatch] = React.useReducer(
    (state: ToDoList, action: ActionType) => {
      switch (action.type) {
        case "addTodo": {
          return {
            ...state,
            todos: [...state.todos, action.todo]
          };
        }
        case "deleteTodo": {
          return {
            ...state,
            todos: state.todos.filter(item => item._id != action.id)
          };
        }
        case "loadAllTodos": {
          return { ...state, todos: action.todos };
        }
        case "updateStatus": {
          state.todos.map(item => {
            if (item._id == action.id) {
              item.status = item.status == 1 ? 0 : 1;
            }
          });
          return { ...state };
        }
        case "updateSort": {
          console.log("dispatch: ", action.value);
          state.sortBy = action.value;
          return { ...state };
        }
        case "updatePriority": {
          state.todos.map(item => {
            if (item._id == action.id) {
              item.priority = action.value;
            }
          });
          return { ...state };
        }
      }
    },
    initialState
  );

  const deleteHandle = async (value: string) => {
    removeTodoFromDB(value);
    dispatch({ type: "deleteTodo", id: value });
  };

  const addHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    const node = inputRef.current;
    const title = node.value;
    node.value = "";
    const todo = await addTodoFromDB(title);
    dispatch({ type: "addTodo", todo });
  };

  const updateTodo = async (action: string, todo: todo) => {
    const { _id, status, title, priority } = todo;
    switch (action) {
      case "status": {
        await updateStatusFromDB(_id, status, title, priority);
        dispatch({ type: "updateStatus", id: _id, status: status });
      }
      case "priority": {
        await updatePriorityFromDB(_id, status, title, priority);
        dispatch({ type: "updatePriority", id: _id, value: priority });
      }
    }
  };

  const sortHandle = (e: any) => {
    const value = e.currentTarget.value;
    dispatch({ type: "updateSort", value });
  };

  const renderSortedTodo = () => {
    switch (state.sortBy) {
      case "normal": {
        console.log("inside render: normal");
        const normalTodos = state.todos;
        return renderTodo(normalTodos);
      }
      case "priority": {
        const priorityTodos = state.todos.slice(0);
        priorityTodos.sort((todo1, todo2) => todo1.priority - todo2.priority);
        return renderTodo(priorityTodos);
      }
      case "reverse": {
        const reverseTodos = state.todos.slice(0);
        reverseTodos.sort((todo1, todo2) => todo2.priority - todo1.priority);
        return renderTodo(reverseTodos);
      }
    }
  };

  const renderTodo = (todos: todo[]) => {
    return todos.map(({ _id, title, status, priority }: todo) => {
      return (
        <TodoReducer
          id={_id}
          key={_id}
          deleteHandle={deleteHandle}
          title={title}
          status={status}
          priority={priority}
          updateTodo={updateTodo}
        />
      );
    });
  };

  return (
    <>
      <ul>
        <div className="toolbar">
          <div className="form-control" id="filterToolbar">
            <label htmlFor="filter">Filter</label>
            <select value="all" id="filter">
              <option value="all">All</option>
              <option value="complete">Complete</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <div className="form-control" id="sortToolbar">
            <label htmlFor="sort">Sort By</label>
            <div id="sort">
              <input
                type="radio"
                checked={state.sortBy === "normal"}
                value="normal"
                onChange={sortHandle}
              />
              <span> normal</span>
              <input
                type="radio"
                checked={state.sortBy === "priority"}
                value="priority"
                onChange={sortHandle}
              />
              <span> priority</span>
              <input
                type="radio"
                checked={state.sortBy === "reverse"}
                value="reverse"
                onChange={sortHandle}
              />
              <span> reverse</span>
            </div>
          </div>
        </div>
        <div className="screen">{renderSortedTodo()}</div>
        <div className="control">
          <form onSubmit={addHandle}>
            <input
              className="todo"
              type="text"
              placeholder="Add todo here"
              ref={inputRef}
              style={{ textIndent: "10px" }}
            />
          </form>
        </div>
      </ul>
    </>
  );
};

async function addTodoFromDB(title: string) {
  try {
    const reponse = await fetch("/api/todo", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });
    const todo = await reponse.json();
    return todo;
  } catch (err) {
    console.log(err);
  }
}

async function removeTodoFromDB(id: string) {
  try {
    await fetch(`/api/${id}`, {
      mode: "cors",
      method: "DELETE"
    });
  } catch (err) {
    console.log(err);
  }
}

async function updateStatusFromDB(
  id: string,
  status: number,
  title: string,
  priority: number
) {
  try {
    fetch(`/api/${id}`, {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status, title, priority })
    });
  } catch (err) {
    console.log(err);
  }
}

async function updatePriorityFromDB(
  id: string,
  status: number,
  title: string,
  priority: number
) {
  try {
    fetch(`/api/${id}`, {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status, title, priority })
    });
  } catch (err) {
    console.log(err);
  }
}

export default TodoListReducer;
