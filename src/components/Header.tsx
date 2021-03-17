import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function Header() {
  return (
    <div className="header">
      <AppBar className="app-bar" style={{background:"#f5f5f5"}}>
        <Toolbar>
          <Typography variant="h6" className="title" style={{color:"#01579b"}}>
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