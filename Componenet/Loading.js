import { Grid } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";

export const Loading = ({ type, color }) => {
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
        <ReactLoading type={type} color={color} height={"20%"} width={"20%"} />
      </Grid>
    </div>
  );
};
