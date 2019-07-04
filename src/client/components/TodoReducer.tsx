import * as React from "react";
import styled from "styled-components";

const Item = styled.li`
  list-style-type: none;
  background: #fff;
  min-height: 40px;
  display: flex;
  border-radius: 10px;
  border: 1px solid #bbbcc3;
  margin-bottom: 15px;
  padding: 18px 14px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  align-items: center;
`;

const StyledTodo = styled.div`
  font-size: 1.2rem;
  border: none;
  color: #343434;
  :focus {
    outline: none;
  }
  text-indent: 10px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  width: 100%;
  margin-bottom: 10px;
`;
// need to refactor
interface todo {
  _id: string;
  title: string;
  status: number;
  priority: number;
}

interface TodoReducerProps {
  id: string;
  title: string;
  status: number;
  priority: number;
  deleteHandle: (id: string) => void;
  updateTodo: (action: string, todo: todo) => void;
}

const TodoReducer = ({
  id,
  title,
  deleteHandle,
  status,
  priority,
  updateTodo
}: TodoReducerProps) => {
  const initLabel = [
    { value: 1, mode: "strict" },
    { value: 2, mode: "normal" },
    { value: 3, mode: "loose" }
  ];
  const isDone = status == 1 ? true : false;
  const styledLabel =
    status == 1
      ? { textDecoration: "line-through" }
      : { textDecoration: "none" };

  const conditionLabel = () => {
    switch (priority) {
      case 1: {
        return { color: "red" };
      }
      case 2: {
        return { color: "#0095ff" };
      }
      case 3: {
        return { color: "#8a9a9b" };
      }
    }
  };

  const onChangeHandle = (e: any) => {
    switch (e.currentTarget.className) {
      case "status": {
        const updatedStatus = status == 1 ? 0 : 1;
        updateTodo("status", {
          _id: id,
          status: updatedStatus,
          title,
          priority
        });
      }
      case "priority": {
        const priority = e.currentTarget.value;
        updateTodo("priority", { _id: id, status, title, priority });
      }
    }
  };

  const onDeleteHandle = (id: string) => {
    deleteHandle(id);
  };

  return (
    <Item>
      <form style={{ flex: " 0 0 90%" }}>
        <div>
          <StyledTodo style={{ ...styledLabel, ...conditionLabel() }}>
            {title}
          </StyledTodo>
          <label>
            <input
              type="checkbox"
              checked={isDone}
              onChange={onChangeHandle}
              className="status"
            />{" "}
            Done
          </label>

          {initLabel.map(item => (
            <label key={item.value}>
              <input
                type="radio"
                value={item.value}
                // onChange={changeHandle}
                onChange={onChangeHandle}
                checked={priority == item.value ? true : false}
                className="priority"
              />
              {item.mode}
            </label>
          ))}
        </div>
      </form>

      <button
        style={{
          float: "right",
          width: 20,
          height: 20,
          background: `url('https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/trash-512.png')`,
          backgroundSize: "cover",
          border: "none"
        }}
        onClick={() => onDeleteHandle(id)}
      />
    </Item>
  );
};

export default TodoReducer;
