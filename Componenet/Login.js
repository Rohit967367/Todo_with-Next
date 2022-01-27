import { Button, Grid } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";

import { signIn } from "next-auth/react";

const Login = () => {
  const LoginWithGoogle = () => {
    signIn();
  };
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={LoginWithGoogle}
        >
          Sign Up with Google
        </Button>
      </Grid>
    </div>
  );
};

export default Login;
