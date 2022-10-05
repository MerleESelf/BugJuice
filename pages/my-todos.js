import { useAuth } from "../hooks/useAuth";
// we get onto this page
// useAuth didn't redirect use
// we want to query for data

// we'll hit

const MyToDos = () => {
  useAuth();
  return <div>My Todos!</div>;
};

export default MyToDos;
