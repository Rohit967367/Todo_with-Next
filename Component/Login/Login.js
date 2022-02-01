import React, { useEffect } from "react";
import task from "../../public/task.svg";
import Image from "next/image";
import Classes from "./login.module.css";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { userDetail } from "../Store/InfoTodo";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
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

  const dispatch = useDispatch();

  const Signin = (e) => {
    e.preventDefault();
    signIn("google");

    // router.push("/", undefined, { shallow: true });
  };
  return (
    <div className={Classes.login}>
      <div className={Classes.conatin}>
        <div className={Classes.container}>
          <div className={Classes.head}>
            <div className={Classes.heading}>
              <h1 className={Classes.title}>Sign in</h1>
            </div>
            <div className={Classes.info}>
              <h5 className={Classes.shortInfo}>
                Welcome! Please Log in to access TODO
              </h5>
            </div>
            <div className={Classes.google}>
              <div className={Classes.googleButton}>
                <Button
                  variant="contained"
                  onClick={Signin}
                  style={{ cursor: "pointer" }}
                  startIcon={<GoogleIcon />}
                >
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
          <div className={Classes.image}>
            <div className={Classes.imageContainer}>
              <Image
                src={task}
                alt="task"
                className={Classes.task}
                width={"300px"}
                height={"300px"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
