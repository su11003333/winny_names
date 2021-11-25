import React,{useEffect,useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {random} from 'lodash';



export default React.memo(({name,number1,number2,number3,number4})=>{
    const [showUnit,setShowUnit] = useState(true)
    const useStyles = makeStyles(() => ({
        root: {
            position: "absolute",
            background: "black",
            opacity: 0.9,
        animation: "move 18s forwards",
            fontSize:"50px",
            height: "150px",
            width: "320px",
            fontWeight:"bold",
            animationDelay: "-0.2s",
            transform: `translate3d(${number1}px, ${number2}px, ${number3}px)`,
            color:`hsl( ${number4} , 70%, 50%)`,
            background: "transparent",
            textShadow:`
            0 0 20px hsl( ${number4} , 70%, 50%),
            0 0 35px hsl( ${number4} , 70%, 50%)`, 
        },
      }
      )
      );

    const classes = useStyles();



    useEffect(()=>{
        if(name === ''){
            setShowUnit(false);
        }
        setTimeout(()=>{
            setShowUnit(false)
        },14000)

        return clearTimeout();
    },[])



    return showUnit?
    (
        <div className={classes.root}>{name}</div>
    ):null
})