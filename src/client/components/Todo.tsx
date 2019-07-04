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

const StyledInput = styled.input`
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
  flex: 0 0 75%;
`;

const Todo = ({
  id,
  title,
  status,
  updateStatusHandler,
  updateTitleHandler,
  deleteHandler
}: any) => {
  const isDone = status == 1 ? true : false;
  const styledLabel =
    status == 1
      ? { textDecoration: "line-through", color: "#0095ff" }
      : { textDecoration: "none", color: "#8a9a9b" };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target) {
      const id = e.target.id;
      updateStatusHandler(id);
    }
  };

  return (
    <Item>
      <input
        type="checkbox"
        checked={isDone}
        onChange={handleInputChange}
        id={id}
      />
      <StyledInput
        defaultValue={title}
        onChange={e => updateTitleHandler(id, e.currentTarget.value)}
        style={styledLabel}
      />
      <button style={{ float: "right" }} onClick={() => deleteHandler(id)}>
        Delete
      </button>
    </Item>
  );
};

export default Todo;
