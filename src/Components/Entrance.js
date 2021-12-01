import React, { useState, useEffect } from 'react';
import { db } from "../Firebase/Firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import NameUnit from "./NameUnit";
import videoBg from '../Assets/video/bg.mp4';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    video: {
        position: 'absolute',
        width: "100%",
        minHeight: "100%",
        left: 0,
        top: 0
    }
}))

function Entrance() {
    const [allNames, setAllNames] = useState([]);
    const classes = useStyles();
    const params = useParams();

    useEffect(() => {
        db.collection("events")
            .doc(params.eventId)
            .collection("names")
            .orderBy("created_at", "asc")
            .onSnapshot((snapshot) => {
                let names = snapshot.docs.map((doc) => (doc.data()))
                setAllNames(
                    names
                )
            })
    }, [])


    return (
        <div className="entrance--container">
            <video className={classes.video} autoPlay loop muted>
                <source src={videoBg} type='video/mp4' />
            </video>
            <div className="entrance--title__container">
                <div className="entrance--title__wrapper">
                    <div className="entrance--title">2021 SAP業務表揚大會宣示目標</div>
                    <div className="entrance--subtitle">超越無限</div>
                </div>
            </div>
            <div className="entrance--wrapper">
                <div className="bubble--wrapper">
                    {allNames.map((item) => {
                        return (
                            <NameUnit key={item.created_at.seconds + item.created_at.nanoseconds} name={item.name} number1={item.number1} number2={item.number2} number3={item.number3} number4={item.number4} />
                        )
                    })}
                </div>

            </div>

        </div>
    )
}

export default Entrance;

