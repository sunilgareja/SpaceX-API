import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  navbg: {
    background: "white",
  },
});

const Navigation = ()=> {
  const classes = useStyles();

  return (
    <div className={classes.root}>
            <AppBar position="static" className={classes.navbg}>
                <Toolbar>
                <Link to="/">
                    <img alt="SpaceX" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/1280px-SpaceX-Logo.svg.png" style={{display:"inline", width:123, paddingBottom:8, align:"center" }}/>
                    <img alt="API" src="https://help.apiary.io/images/swagger-logo.png" style={{display:"inline",width:30, align:"center" }}/>
                </Link>
                </Toolbar>
            </AppBar>
    </div>
  );
}

export default Navigation