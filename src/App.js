import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Application from "./Components/Application";
import Chat from "./Components/Chat";
import Login from "./Components/SignUp";
import Home from "./Components/Home";
import Signin from "./Components/Signin"
import Register from "./Components/Register"
import Entrance from "./Components/Entrance"
import Qrcode from "./Components/Qrcode"
import KeyName from "./Components/KeyName"
import Namemapping from "./Components/Namemapping"
import { BrowserRouter as Router, Switch, Route ,Redirect } from "react-router-dom";
import { auth, db } from "./Firebase/Firebase";
import nameMapping from "./Data/name_mapping";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#22273b !important",
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("user exits");
            } else {
              const details = {
                name: user.displayName,
                // displayName: user.displayName.split(" ")[0],
                photoURL: user.photoURL,
                email: user.email,
                uid: user.uid,
              };
              db.collection("users")
                .doc(user.uid)
                .set(details)
                .then((res) => {
                  console.log("new user created");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });

        setUser(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);
console.log('user');
console.log(user)
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/entrance/:eventId" exact component={Entrance}/>
          <Route path="/qrcode/:eventId" exact component={Qrcode}/>
          <Route path="/keyname/:eventId" exact component={KeyName}/>
          <Route path="/namemapping/:eventId/:id" component={Namemapping}/>
          {!user ? (
            <>
            <Route path="/register" exact component={Register} />
            <Route path="/signin" exact component={Signin} />
            {/* <Route path="/login" exact component={Login} /> */}
            <Redirect to="/signin"/>
            </>

        ) : (
          <>
          <div className={classes.root}>
            <Application uid={user} />
            <main className={classes.content}>
              <div className={classes.toolbar} style={{ minHeight: "50px" }} />
              
                <Route path="/home" component={Home} exact/>

                <Route path="/event/:id" component={Chat}/>
            </main>
          </div>
          <Redirect to="/home"/>
          </>
        )}
            <Redirect to="/entrance/:eventId"/>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
