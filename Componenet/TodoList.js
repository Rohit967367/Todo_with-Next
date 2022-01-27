import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { db } from "../FireBase/Firebase";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const { data: session } = useSession();
  const [getUser, setGetUser] = useState([]);

  useEffect(() => {
    if (session) {
      setGetUser(session.user.email);
    }
  }, [session]);
  // console.log(getUser);

  useEffect(() => {
    const connetDB = collection(db, "todo");
    const q = query(
      connetDB,
      orderBy("timestamp", "desc"),
      where("email", "==", getUser)
    );

    // console.log(where("email", "==", getUser));

    const unsubcribe = onSnapshot(q, (quersnapshot) => {
      setTodoList(
        quersnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });

    return unsubcribe;
  }, [getUser]);
  return (
    <div>
      {todoList.map((data) => (
        <TodoItem
          key={data.id}
          id={data.id}
          title={data.title}
          detail={data.detail}
          complete={data.complete}
          timestamp={data.timestamp}
        />
      ))}
    </div>
  );
};

export default TodoList;
