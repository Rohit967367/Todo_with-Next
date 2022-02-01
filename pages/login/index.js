import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Login from "../../Component/Login/Login";
import Loading from "../../Component/Add/Loading";

const index = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.replace("/");
      setLoading(false);
    }
  }, [session, loading]);

  if (loading) {
    return (
      <Loading
        type={"bubbles"}
        color={"white"}
        height={"15%"}
        width={"15%"}
        heig={"100vh"}
      />
    );
  } else {
    return (
      <div>
        <Login />
      </div>
    );
  }
};

export default index;
