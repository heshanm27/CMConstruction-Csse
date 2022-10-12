import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import { setCurruentUser, unsetCurruntUser } from "../Redux/userSlice";
import { useDispatch } from "react-redux";

import Home from "../Pages/Home";
import CustomDrawer from "../Components/CustomDrawer/CustomDrawer";
const theme = createTheme({
  palette: {
    primary: {
      main: "#0071F2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0071F2",
      light: "#2D9CDB",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontWeightLight: 400,
    fontWeightBold: 700,
    fontWeightRegular: 400,
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const UserDetails = {};
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          UserDetails.id = user.uid;
          UserDetails.name = user.name;
          UserDetails.phoneNo = docSnap.data().phoneNo;
          UserDetails.educationLevel = docSnap.data().education;
          UserDetails.email = user.email;
          UserDetails.image = docSnap.data().img;
          UserDetails.role = docSnap.data().userRole;
          UserDetails.intrest = docSnap.data().intrest;
        }

        dispatch(setCurruentUser(UserDetails));
      } else {
        dispatch(unsetCurruntUser(user));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <Routes>
          {/* <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/signin" element={<SignIn />} /> */}
          <Route element={<CustomDrawer />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
