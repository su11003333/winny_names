import React, { useState, useCallback ,useEffect} from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { auth } from '../Firebase/Firebase';
import { db } from "../Firebase/Firebase";
import firebase from "firebase/app";
import { random } from "lodash";
import nameMapping from '../Data/name_mapping';

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
    color: "black",
    backgroundColor: "white",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "20px"
  },
  nameWrapper:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column"
  }
}));

const Form = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [name, setName] = useState('');
  const params = useParams();
  const sendData = useCallback(() => {
    const userName = {
      name: name,
      number1: random(2000, -2000),
      number2: random(2000, -2000),
      number3: random(500, 1),
      number4: random(360),
      created_at: firebase.firestore.Timestamp.now(),
    };
    if (userName !== '') {
      db.collection("events")
        .doc(params.eventId)
        .collection("names")
        .add(userName)
        .then((res) => {
          console.log("message sent")
          //   alert('提交成功')
          setName('');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
  const sendName = (e) => {
    e.preventDefault();
    sendData()

  }




  const cancelClick = () => {
    setName('');
  }

  useEffect(()=>{
    if(params.id){
      setName(nameMapping[params.id])
    }
  },[params])

  return (
    <div className={classes.root} >
      <div className={classes.padel}>
      <p>您是{name}嗎？</p>
        <div className={classes.nameWrapper}>

          <Button onClick={sendName} variant="contained" color="primary">
            確認送出
          </Button>
          <br/>
          <Button variant="contained" onClick={cancelClick}>
            手動輸入姓名
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;