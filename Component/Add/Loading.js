import { Box, CircularProgress, Grid } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color, height, width, heig }) => {
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        style={{ minHeight: { heig } || "1px" }}
      >
        <ReactLoading type={type} color={color} height={height} width={width} />
      </Grid>
    </div>
  );
};

export default Loading;

// export default function CircularIndeterminate() {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <CircularProgress />
//     </Box>
//   );
// }
