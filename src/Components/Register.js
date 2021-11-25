import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { auth } from '../Firebase/Firebase';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),


    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  padel: {
    width: 400,
    backgroundColor: "white",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "20px"
  }
}));

const Form = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input

  // const emailRef = userRef();
  // const passwordRef = userRef();
  // const rePasswordRef = userRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email,password,rePassword);
    if (email && password && rePassword && password === rePassword)
      auth.createUserWithEmailAndPassword(email,password)
        .then(user => console.log(user))
        .catch(err => console.log(err))
    // handleClose();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.padel}>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          value={email}
          // ref={emailRef}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required
          value={password}
          // ref={passwordRef}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          label="RePassword"
          variant="outlined"
          type="rePassword"
          required
          value={rePassword}
          // ref={rePasswordRef}
          onChange={e => setRePassword(e.target.value)}
        />
        <div>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Signup
          </Button>
        </div>
      </div>

    </form>
  );
};

export default Form;