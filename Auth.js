// import { getAuth } from "firebase/auth";
// import { createContext, useContext, useEffect, useState } from "react";
// import { Loading } from "./Componenet/Loading";
// import { Login } from "./Componenet/Login";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   // const [currentUser, setCurrentUser] = useState(null);
//   // const [isFetching, setIsFetching] = useState(true);
//   useEffect(() => {
//     const auth = getAuth();
//     return auth.onIdTokenChanged(async (user) => {
//       if (!user) {
//         console.log("on user");
//         // setCurrentUser(null);
//         // setIsFetching(false);
//         return;
//       }

//       const token = await user.getIdToken();
//       // setCurrentUser(user);
//       // setIsFetching(false);
//       console.log("token", token);
//       console.log("user", user);
//     });
//   }, []);

//   // if (isFetching) {
//   //   return <Loading type="bubbles" color="yellowgreen" />;
//   // }

//   // if (!currentUser) {
//   //   return <Login />;
//   // } else {
//   return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
//   // }
// };

// export const useAuth = () => useContext(AuthContext);
