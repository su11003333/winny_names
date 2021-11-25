import React, { useState,useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { auth } from '../Firebase/Firebase';
import { db } from "../Firebase/Firebase";
import firebase from "firebase/app";
import {random} from "lodash";

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
    color:"black",
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
  const [name, setName] = useState('');
    const sendData=useCallback(()=>{
        const userName = {
            name:name,
            number1:random(1000,-1000),
            number2:random(1000,-1000),
            number3:random(500,1),
            number4:random(360),
            created_at: firebase.firestore.Timestamp.now(),
          };
        if(userName !== ''){
            db.collection("events")
            .doc('1')
            .collection("names")
            .add(userName)
            .then((res)=>{
                console.log("message sent")
              //   alert('提交成功')
                setName('');
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    })
  const sendName = (e)=>{
      e.preventDefault();
        sendData()

  }
  const keyDownHandler =(e)=>{
    e.preventDefault();
    if(e.key === 'Enter'){
      sendData()
    };
  }




  const cancelClick=()=>{
    setName('');
  }

  return (
    <div className={classes.root} >
        <div className={classes.padel}>
      <TextField
        label="Name"
        variant="outlined"
        type="name"
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={cancelClick}>
          取消
        </Button>
        <Button  onClick={sendName} variant="contained" color="primary">
          提交
        </Button>
      </div>
        </div>

    </div>
  );
};

export default Form;