import React, { useEffect, useState } from 'react';
import './App.css';
import Instagram from './Components/Instagram';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { auth } from './firebase';
import AddNewPost from './Components/AddNewPost';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  //Modals
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  // userinfo
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setUser(authuser);

      } else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username])


  function signUp(event) {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => { return authUser.user.updateProfile({ displayName: username }) })
      .catch((error) => alert(error.message));
    setOpen(false);
  }

  function signIn(event) {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message));
    setOpenSignIn(false);
  }


  const classes = useStyles();
  return (
    <div className="App">

      {/* signup modal */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signupForm">
            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta_logo" />
            </center>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" onClick={signUp} >Sign Up</Button>
          </form>
        </div>
      </Modal>

      {/* sign in modal */}

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signupForm">
            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta_logo" />
            </center>
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" onClick={signIn} >Sign In</Button>
          </form>
        </div>
      </Modal>
      <div className="app_header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram_logo" />
        <div className="header__buttons">
          {user ? (<Button variant="outlined" color="secondary" onClick={() => auth.signOut()}>Logout</Button>) :
            (
              <div className="header__loginContainer">
                <Button variant="outlined" color="primary" onClick={() => setOpenSignIn(true)}>Sign In</Button>
                <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>Sign Up</Button>
              </div>
            )}
        </div>
      </div>
      {user?.displayName ? (
        <AddNewPost username={user.displayName} />
      ) : (
          <h2 style={{ textAlign: "center" }}>Please Login To Upload New Post</h2>
        )}
      <Instagram logedInUser={user} />
    </div>
  );
}

export default App;
