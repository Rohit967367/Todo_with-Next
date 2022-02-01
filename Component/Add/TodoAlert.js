import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeAlert } from "../Store/AlertTodo";

export default function TodoAlert(props) {
  const { open, setOpen, msg, type } = props;
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeAlert());

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={1800}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={type || "success"}
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
