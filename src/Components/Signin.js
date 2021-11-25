import React, { useState } from 'react';
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
  padel:{
    width:400,
    backgroundColor:"white",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding:"20px"
  }
}));

const Form = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, password);
    if(email && password){
      auth.signInWithEmailAndPassword(email,password)
      .then(user =>console.log(user))
      .catch(err=>console.log(err))
    }
    // handleClose();
  };

  const cancelClick=()=>{
    setEmail('');
    setPassword('');
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
        <div className={classes.padel}>
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        required

        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={cancelClick}>
          取消
        </Button>
        <Button type="submit" variant="contained" color="primary">
          登入後台
        </Button>
      </div>
        </div>

    </form>
  );
};

export default Form;