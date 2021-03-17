import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

function Header() {
  const classes = useStyles();

  return (
    <div className="header">
      <AppBar className="app-bar" position="static" style={{background:"#f5f5f5"}}>
        <Toolbar>
          {/* <Typography variant="h6" className={classes.title}> */}
          <Typography variant="h6" className="title">
            HOSPITAL
          </Typography>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Header;