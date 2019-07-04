import * as React from "react";

const FetchAllTodos = (url: string) => {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchUrl = async () => {
    const response = await fetch(url, { method: "GET" });
    const json = await response.json();
    setTodos(json);
    setLoading(false);
  };

  React.useEffect(() => {
    return () => {
      fetchUrl();
    };
  }, []);

  return [todos, loading];
};

export default FetchAllTodos;
