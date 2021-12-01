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
import { RiImageAddLine } from "react-icons/ri";
import FileUpload from "./FileUpload";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { ColorPicker, createColor } from "material-ui-color";
import "emoji-mart/css/emoji-mart.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "white"
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
    marginLeft: 30,
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
  const [preview, setPreview] = useState({});

  const [allSettings, setAllSettings] = useState(
    {


      displayName: '',
      showEntrance: false,
      showKeyName: false,
      showQrcode: false,
      startToFlyIn: false,
      entranceTitle: '',
      entranceSubTitle: '',
      titleColor: '#ffffff',
      subtitleColor: '#ffffff',
      entranceBg: '',
      qrcodeBg: '',
      keyNameBg: '',
      predictPopulation: 0,

    }



  );
  const [modalState, setModalState] = useState(false);
  const [file, setFileName] = useState(null);

  const [eventName, setEventName] = useState("");
  const [uid, setUid] = useState("");
  useEffect(() => {
    setAllSettings(
      {
        displayName: '',
        showEntrance: false,
        showKeyName: false,
        showQrcode: false,
        startToFlyIn: false,
        entranceTitle: '',
        entranceSubTitle: '',
        titleColor: '#ffffff',
        subtitleColor: '#ffffff',
        entranceBg: '',
        qrcodeBg: '',
        keyNameBg: '',
        predictPopulation: 0,
      }
    );
    console.log("useEffect start")
    if (params.id) {
      db.collection("events")
        .doc(params.id)
        .onSnapshot((snapshot) => {
          setEventName(snapshot.data().eventName);
        });
      db.collection("events")
        .doc(params.id)
        .onSnapshot((snapshot) => {

          // const data = snapshot.docs.map((doc) => (doc.data()))
          setAllSettings(
            snapshot.data()
          );

        });
    }
  }, [params]);

  const sendSettings = (e) => {
    e.preventDefault();
    console.log('e');
    console.log(e)
    if (allSettings && params.id) {
      const userData = JSON.parse(localStorage.getItem("userDetails"));
      console.log("fire")
      if (userData) {
        const displayName = userData.displayName;
        // const imgUrl = userData.photoURL;
        const uid = userData.uid;
        const showEntrance = allSettings.showEntrance || false;
        const showKeyName = allSettings.showKeyName || false;
        const showQrcode = allSettings.showQrcode || false;
        const startToFlyIn = allSettings.startToFlyIn || false;
        const entranceTitle = allSettings.entranceTitle || '';
        const entranceSubTitle = allSettings.entranceSubTitle || '';
        const titleColor = allSettings.titleColor || '';
        const subtitleColor = allSettings.subtitleColor || '';
        const entranceBg = allSettings.entranceBg || '';
        const qrcodeBg = allSettings.qrcodeBg || '';
        const keyNameBg = allSettings.keyNameBg || '';
        const predictPopulation = allSettings.predictPopulation || 0;
        let obj = {
          // displayName: displayName,
          timestamp: firebase.firestore.Timestamp.now(),
          showEntrance: showEntrance,
          showKeyName: showKeyName,
          showQrcode: showQrcode,
          startToFlyIn: startToFlyIn,
          uid: uid,
          entranceTitle: entranceTitle,
          entranceSubTitle: entranceSubTitle,
          titleColor: titleColor,
          subtitleColor: subtitleColor,
          entranceBg: entranceBg,
          qrcodeBg: qrcodeBg,
          keyNameBg: keyNameBg,
          predictPopulation: predictPopulation,
        };
        console.log('obj');
        console.log(obj)
        db.collection("events")
          .doc(params.id)
          // .collection("settings")
          .set(obj, { merge: true })
          .then((res) => {
            console.log("settings sent");
          })
          .catch((err) => {
            console.log(err);
          });
      }

    }
  };


  const openModal = () => {
    setModalState(!modalState);
  };


  const handelFileUpload = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      e.target.files[0].target = e.target.name;
      setPreview({ ...preview, [e.target.name]: URL.createObjectURL(e.target.files[0]) });
      setFileName(e.target.files[0]);
      openModal();
    }
    e.target.value = null;
  };
  const handleChange = (event) => {
    setAllSettings({ ...allSettings, [event.target.name]: event.target.value });
  };

  const handleCheck = (event) => {
    setAllSettings({ ...allSettings, [event.target.name]: event.target.checked });
  };

  const handleTitleColor = (value) => {
    setAllSettings({ ...allSettings, titleColor: value });
  };

  const handleSutTitleColor = (value) => {
    setAllSettings({ ...allSettings, subtitleColor: value });
  };


  console.log("all Settings")
  console.log(allSettings)
  console.log('preview');
  console.log(preview)
  return (
    <div className={classes.root}>
      {modalState ? <FileUpload setState={openModal} file={file} setAllSettings={setAllSettings} allSettings={allSettings} /> : null}
      <Grid item xs={12} className={classes.roomName}>
        <BiHash className={classes.iconDesign} />
        <h3 className={classes.roomNameText}>{eventName}</h3>
      </Grid>
      <Grid item xs={12} className={classes.chat}>
        <ScrollableFeed>
          <Grid item xs={12}>
            <FormControlLabel
              control={<IOSSwitch checked={allSettings.showEntrance} onChange={(e) => handleCheck(e)} name="showEntrance" />}
              label="開放主場頁面"
            />
            <FormControlLabel
              control={<IOSSwitch checked={allSettings.showQrcode} onChange={(e) => handleCheck(e)} name="showQrcode" />}
              label="開放QRcode頁面"
            />
            <FormControlLabel
              control={<IOSSwitch checked={allSettings.showKeyName} onChange={(e) => handleCheck(e)} name="showKeyName" />}
              label="開放輸入姓名 頁面"
            />
            <FormControlLabel
              control={<IOSSwitch checked={allSettings.startToFlyIn} onChange={(e) => handleCheck(e)} name="startToFlyIn" />}
              label="動畫開始(允許姓名入場)"
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <form autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="主題文字"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={allSettings.entranceTitle}
                  name="entranceTitle"
                  onChange={e => handleChange(e)}
                  style={{
                    backgroundColor: "rgb(45, 45, 73)",
                    borderRadius: "5px",
                    color: "white",
                  }}
                />
                <ColorPicker value={allSettings.titleColor} onChange={handleTitleColor} />
                <TextField
                  id="outlined-basic"
                  label="副主題文字"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={allSettings.entranceSubTitle}
                  name="entranceSubTitle"
                  onChange={e => handleChange(e)}
                  style={{
                    backgroundColor: "rgb(45, 45, 73)",
                    borderRadius: "5px",
                    color: "white",
                  }}
                />
                <ColorPicker value={allSettings.subtitleColor} onChange={handleSutTitleColor} />
                <TextField
                  id="outlined-basic"
                  label="參與活動總人數"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={allSettings.predictPopulation}
                  name="predictPopulation"
                  onChange={e => handleChange(e)}
                  style={{
                    backgroundColor: "rgb(45, 45, 73)",
                    borderRadius: "5px",
                    color: "white",
                  }}
                />

                <br />



              </form>
            </Grid>
            <Grid item xs={6}>
              {preview['entranceBg'] && <img width="80" src={preview['entranceBg']} />}
              {allSettings.entranceBg && !preview['entranceBg'] ? <img width="80" src={allSettings.entranceBg} /> : null}
              <input
                accept="image/*"
                className={classes.inputFile}
                id="icon-button-file"
                type="file"
                name="entranceBg"
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
                上傳會場背景
              </label>
              <br />
              {preview['qrcodeBg'] && <img width="80" src={preview['qrcodeBg']} />}
              {allSettings.qrcodeBg && !preview['qrcodeBg'] ? <img width="80" src={allSettings.qrcodeBg} /> : null}
              <input
                accept="image/*"
                className={classes.inputFile}
                id="icon-button-qrcodebg"
                type="file"
                name="qrcodeBg"
                onChange={(e) => handelFileUpload(e)}
              />
              <label htmlFor="icon-button-qrcodebg">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <RiImageAddLine style={{ color: "#b9bbbe" }} />
                </IconButton>
                上傳掃描背景
              </label>
              <br />
              {preview['keyNameBg'] && <img width="80" src={preview['keyNameBg']} />}
              {allSettings.keyNameBg && !preview['keyNameBg'] ? <img width="80" src={allSettings.keyNameBg} /> : null}
              <input
                accept="image/*"
                className={classes.inputFile}
                id="icon-button-keynamebg"
                type="file"
                name="keyNameBg"
                onChange={(e) => handelFileUpload(e)}
              />
              <label htmlFor="icon-button-keynamebg">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <RiImageAddLine style={{ color: "#b9bbbe" }} />
                </IconButton>
                上傳輸入姓名頁背景
              </label>
            </Grid>
          </Grid>

        </ScrollableFeed>
        <div style={{}} />
      </Grid>

      <div style={{ position: "fixed", left: "50%", bottom: "10px", transform: "translateX('-50%')" }}>
        <Button
          // onClick={handleClose}

          style={{ color: "white" }}>
          取消
        </Button>
        <Fab variant="extended" onClick={sendSettings}>
          <NavigationIcon className={classes.extendedIcon} />
          更新設定
        </Fab>
      </div>

    </div>
  );
}

export default Chat;
