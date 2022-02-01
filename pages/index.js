import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Todo from "../Component/Page/Todo";
import { userDetail } from "../Component/Store/InfoTodo";

const Home = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(
        userDetail({
          name: session.user.name,
          image: session.user.image,
          email: session.user.email,
        })
      );
    }
  }, [session]);
  console.log(process.env.NEXTAUTH_URL);

  return (
    <div>
      <Todo />
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
