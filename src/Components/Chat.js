import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Messages from "./Messages";
import IconButton from "@material-ui/core/IconButton";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import firebase from "firebase/app";
import ScrollableFeed from "react-scrollable-feed";
import { BiHash } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { Picker } from "emoji-mart";
import { RiImageAddLine } from "react-icons/ri";
import FileUpload from "./FileUpload";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import "emoji-mart/css/emoji-mart.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color:"white"
  },
  chat: {
    position: "relative",
    height: "calc(100vh - 200px)",
    paddingLeft: "10px",
    paddingBottom: "5px",
    paddingTop: "5px",
  },
  footer: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "10px",
  },
  message: {
    width: "100%",
    color: "white",
  },
  roomName: {
    border: "1px solid #0000004a",
    borderLeft: 0,
    borderRight: 0,
    padding: "15px",
    display: "flex",
    color: "#e5e5e5",
  },
  roomNameText: {
    marginBlockEnd: 0,
    marginBlockStart: 0,
    paddingLeft: "5px",
  },
  iconDesign: {
    fontSize: "1.5em",
    color: "#e5e5e5",
  },
  footerContent: {
    display: "flex",
    backgroundColor: "#303753",
    borderRadius: "5px",
    alignItems: "center",
  },
  inputFile: {
    display: "none",
  },
}));

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    marginLeft:30,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});


function Chat() {
  const classes = useStyles();
  const params = useParams();
  const [allSettings, setAllSettings] = useState([]);
  const [userNewMsg, setUserNewMsg] = useState("");
  const [modalState, setModalState] = useState(false);
  const [file, setFileName] = useState(null);
  
  const [eventName, setEventName] = useState("");
  // const [userName, setUserName] = useState("");
  // const [displayName, setDisplayName] = useState("");
  // const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  useEffect(() => {
    if (params.id) {
      db.collection("events")
        .doc(params.id)
        .onSnapshot((snapshot) => {
          setEventName(snapshot.data().eventName);
        });

      db.collection("events")
        .doc(params.id)
        .collection("settings")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setAllSettings(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    }
  }, [params]);

  const sendSettings= (e) => {
    e.preventDefault();
    if (allSettings && params.id) {
      const userData = JSON.parse(localStorage.getItem("userDetails"));

      if (userData) {
        const displayName = userData.displayName;
        // const imgUrl = userData.photoURL;
        const uid = userData.uid;
        const showEntrance = false;
        const showKeyName = false;
        const showQrcode = false;
        const entranceTitle = '';
        const entranceSubTitle = '';
        const titleColor='#ffffff';
        const entranceBg = '';
        const qrcodeBg = '';
        const  keyNameBg= '';
        const predictPopulation = 0;
        const obj = {
          displayName:displayName,
          timestamp: firebase.firestore.Timestamp.now(),
          showEntrance: showEntrance,
          showKeyName: showKeyName,
          showQrcode: showQrcode,
          uid: uid,
          entranceTitle: entranceTitle,
          entranceSubTitle: entranceSubTitle,
          titleColor: titleColor,
          entranceBg: entranceBg,
          qrcodeBg: qrcodeBg,
          keyNameBg: keyNameBg,
          predictPopulation: predictPopulation,
        };

        db.collection("events")
          .doc(params.id)
          .collection("settings")
          .add(obj)
          .then((res) => {
            console.log("settings sent");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // setUserNewMsg("");
      // setEmojiBtn(false);
    }
  };

  const addEmoji = (e) => {
    setUserNewMsg(userNewMsg + e.native);
  };

  const openModal = () => {
    setModalState(!modalState);
  };

  const handelFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setFileName(e.target.files[0]);
      openModal();
    }
    e.target.value = null;
  };
  const handleChange = (event) => {
    setAllSettings({ ...allSettings, [event.target.name]: event.target.checked });
  };


  console.log("all Settings")
  console.log(allSettings)

  return (
    <div className={classes.root}>
      {modalState ? <FileUpload setState={openModal} file={file} /> : null}
      <Grid item xs={12} className={classes.roomName}>
        <BiHash className={classes.iconDesign} />
        <h3 className={classes.roomNameText}>{eventName}</h3>
      </Grid>
      <Grid item xs={12} className={classes.chat}>
        <ScrollableFeed>
          <Grid item xs={12}>
          <FormControlLabel
        control={<IOSSwitch checked={allSettings.showEntrance} onChange={handleChange} name="showEntrance" />}
        label="主場頁面"
      />
              <FormControlLabel
        control={<IOSSwitch checked={allSettings.showQrcode} onChange={handleChange} name="showQrcode" />}
        label="QRcode 頁面"
      />
              <FormControlLabel
        control={<IOSSwitch checked={allSettings.showKeyName} onChange={handleChange} name="showKeyName" />}
        label="輸入姓名 頁面"
      />
            </Grid>
          <Grid item xs={6}>
        <form autoComplete="off">


            <TextField
              id="outlined-basic"
              label="主題文字"
              fullWidth
              margin="normal"
              variant="outlined"
              value={allSettings.entranceTitle}
              style={{
                backgroundColor: "rgb(45, 45, 73)",
                borderRadius: "5px",
                color: "white",
              }}
            />
            <TextField
              id="outlined-basic"
              label="副主題文字"
              fullWidth
              margin="normal"
              variant="outlined"
              value={allSettings.entranceSubTitle}
              style={{
                backgroundColor: "rgb(45, 45, 73)",
                borderRadius: "5px",
                color: "white",
              }}
            />


          </form>
          </Grid>
        </ScrollableFeed>
      </Grid>
      {/* <div className={classes.footer}>
        <Grid item xs={12} className={classes.footerContent}>
          <input
            accept="image/*"
            className={classes.inputFile}
            id="icon-button-file"
            type="file"
            onChange={(e) => handelFileUpload(e)}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <RiImageAddLine style={{ color: "#b9bbbe" }} />
            </IconButton>
          </label>

          <IconButton
            color="primary"
            component="button"
            onClick={() => setEmojiBtn(!emojiBtn)}
          >
            <GrEmoji style={{ color: "#b9bbbe" }} />
          </IconButton>
          {emojiBtn ? <Picker onSelect={addEmoji} theme="dark" /> : null}

          <form
            autoComplete="off"
            style={{ width: "100%", display: "flex" }}
            onSubmit={(e) => sendMsg(e)}
          >
            <TextField
              className={classes.message}
              required
              id="outlined-basic"
              label="Enter Message"
              variant="outlined"
              multiline
              rows={1}
              rowsMax={2}
              value={userNewMsg}
              onChange={(e) => {
                setUserNewMsg(e.target.value);
              }}
            />
            <IconButton type="submit" component="button">
              <FiSend style={{ color: "#b9bbbe" }} />
            </IconButton>
          </form>
        </Grid>
      </div> */}
      <div style={{position:"fixed",left:"50%",bottom:"10px",transform:"translateX('-50%')"}}>
                      <Button 
                // onClick={handleClose}

                 style={{ color: "white" }}>
            取消
          </Button>
 <Fab variant="extended" right>
        <NavigationIcon className={classes.extendedIcon} />
        更新設定
      </Fab>
      </div>

    </div>
  );
}

export default Chat;
