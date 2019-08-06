import React from 'react';
// import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {lightBlue, red, lightGreen } from '@material-ui/core/colors';
import WatchIC from '@material-ui/icons/WatchLater';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import axios from 'axios';
import 'moment/locale/en-gb';
import '../Cards/card.css'

const useStyles = makeStyles( theme=>({
    card: {
        margin: theme.spacing(4)
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    root: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    avatar: {
      backgroundColor: lightBlue[500],
      color:"white",
    },
    chipSuccess: {
      margin: theme.spacing(1),
      background: lightGreen[500],
      color:"white",
    },
    chipFail: {
      margin: theme.spacing(1),
      background: red[500],
      color:"white",
    },
    chipTbc: {
      margin: theme.spacing(1),
    },
    bgImg:{
      backgroundImage:"url(https://www.nasaspaceflight.com/wp-content/uploads/2018/10/2018-10-22-13_27_15-Window.jpg)",
      backgroundColor:"white",
      height: "100%",
      backgroundPosition:"center",
      backgroundRepeat:'no-repeat',
      backgroundSize:"cover"
    },
    heading:{
      fontWeight:"bold",
    }
  }));

  const placeholderChip = (val, classes)=> {
    if(val===true){
      return <Chip className={classes.chipSuccess} label="Success"/>
    } else if (val===false){
      return <Chip className={classes.chipFail} label="Failed"/>
    } else {
      return <Chip className={classes.chipTbc} avatar={<Avatar  className={classes.avatar}><WatchIC/></Avatar>} label="TBC"/>
    }
  }

  const moreInfo =(heading,val)=>{
    if(val){
      return (
        <div>
          <DialogContentText style={{marginTop:15}}>
            <strong>{heading}</strong> {val}
          </DialogContentText>
          <Divider></Divider>
        </div>
      )
    }else {
      return (
        <span>
          <DialogContentText style={{marginTop:15}}>
            <strong>{heading}</strong> N/A
          </DialogContentText>
          <Divider></Divider>
        </span>
      )
    }
  }
  
  const Cards = (props)=> {
    const [open, setOpen] = React.useState(false);
    const [rocketInformation, setRocketInfo] = React.useState({});
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    moment.locale('en-gb');

    async function rocketInfo() {   
      return await axios.get("https://api.spacexdata.com/v3/rockets/"+props.rocketID);
    }

    function handleClickOpen() {
      setOpen(true);
      rocketInfo().then((response) => {
        let data= response.data;
        setRocketInfo({       
          rocketId: data.rocket_id,
          rocketName: data.rocket_name,
          rocketHeightFeet: data.height.feet,
          rocketHeightMeters: data.height.meters,
          rocketMassKg: data.mass.kg,
          rocketMassLb: data.mass.lb,
          rocketStages: data.stages,
          rocketDetails: data.description 
        });

        }).catch((err) => { 
        console.log(err)
      });  
    }    
  
    function handleClose() {
      setOpen(false);
    }  

    return (
        <Grid item xs={12} md={3} sm={6}>
            <Card className={classes.card}  >
                <CardActionArea onClick={handleClickOpen}>
                  <CardMedia
                      component="img"
                      alt={props.missionName}
                      height="auto"
                      image={(props.image)?props.image:"https://www.teslarati.com/wp-content/uploads/2018/02/spacex-falcon-heavy-double-landing.gif"}
                      title={props.missionName}
                      />

                  <CardContent>
                    <Typography gutterBottom variant="h6" >
                    {(props.missionName)?props.missionName:<div className="placeholder-content" style={{height:30}}></div>}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {(props.flightNumber)?"Flight "+props.flightNumber:null}
                    </Typography>
                  </CardContent>  
                </CardActionArea>

                {(props.launchDateTime)?
                <CardActions className={classes.root}>

                  <Tooltip  title="Launch Date">
                    <Chip className={classes.avatar} label={moment.parseZone(props.launchDateTime).format('L')}/>
                  </Tooltip>
                  
                  <Tooltip  title={(props.launchUpcoming)?"Launch Status: Upcoming":"Launch Result"} >
                    {placeholderChip(props.launchSuccess, classes)}
                  </Tooltip>

                  {/* <Link to={"/launch/"+props.flightNumber+""} style={{ textDecoration: 'none', color:"black" }}> */}
                  <Button variant="contained" size="small" onClick={handleClickOpen}>
                    More Info
                  </Button>
                  {/* </Link> */}

                  <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                      className={classes.bgImg}
                      maxWidth="sm"
                      >
                      <DialogTitle id="responsive-dialog-title">                          <AppBar position="static">
                          <Toolbar>
                            <Typography variant="h6" color="inherit">
                            {"Mission "+props.flightNumber+": "+props.missionName}
                            </Typography>
                          </Toolbar>
                        </AppBar>
                      </DialogTitle>
                      
                      <DialogContent >
                        {(props.videoID)?<div className="video-container"><iframe title={props.videoID} width="853" height="480" src={"https://www.youtube.com/embed/"+props.videoID} frameBorder="0" allowFullScreen></iframe></div>:<h2>Video Coming Soon</h2>}

                        <ExpansionPanel style={{marginTop:10}}>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography variant="h6" className={classes.heading} style={{bakground:"red"}}>Launch Details</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Typography>
                              {moreInfo("Details:", props.details)}
                              {moreInfo("Site: ", props.ls)}
                              {(props.imgDl)?<div><DialogContentText style={{marginTop:15}}><a href={props.imgDl} download target="_blank" rel="noopener noreferrer">Download Mission Patch</a></DialogContentText></div>:null}
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel2a-header"
                            >
                              <Typography className={classes.heading} variant="h6">Rocket Details</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                              {moreInfo("Name / ID:", rocketInformation.rocketName+' ('+rocketInformation.rocketId+')')}
                              {moreInfo("Height:", rocketInformation.rocketHeightFeet+'Ft / '+rocketInformation.rocketHeightMeters+'m')}
                              {moreInfo("Mass:", rocketInformation.rocketMassKg+'Kg / '+rocketInformation.rocketMassLb+'Lb')}
                              {moreInfo("No of Stages:", rocketInformation.rocketStages)}
                              {moreInfo("Details:", rocketInformation.rocketDetails)}
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                      </DialogContent>
                      

                      <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary" autoFocus>
                          Close
                        </Button>
                      </DialogActions>
                  </Dialog>

              </CardActions>:null}
            </Card>
        </Grid> 
    );
  }

export default Cards;