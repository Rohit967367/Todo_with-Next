import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../FireBase/Firebase";

const Detail = ({ todoDataFormFirebase }) => {
  const todo = JSON.parse(todoDataFormFirebase);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={0}
    >
      <Grid item xs={3}>
        <Card
          style={{ background: "#fafafa" }}
          sx={{ boxShadow: 3, minWidth: 200, maxWidth: 500 }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {todo.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {todo.detail}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/">
              <Button size="small">Back</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Detail;

export const getStaticPaths = async () => {
  const getFromCollection = await getDocs(collection(db, "todo"));

  const snapshot = getFromCollection.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });

  return {
    paths: snapshot,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const connectToCollection = doc(db, "todo", id);

  const gettingDoc = await getDoc(connectToCollection);

  return {
    props: { todoDataFormFirebase: JSON.stringify(gettingDoc.data()) || null },
  };
};
