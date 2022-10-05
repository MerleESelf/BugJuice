import { useAuth } from "../hooks/useAuth";

const MyToDos = () => {
  useAuth();
  return <div>My Todos!</div>;
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default MyToDos;
