import React from "react";
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ReactSVG } from 'react-svg';
import logo from "../img/logo-epworth.svg";


function Header(props) {
  return (
    <div className="header">
      <AppBar className="app-bar" elevation={1}>
        <Toolbar className="header-bar">
            <Link to={`/home/${props.patientId}`} className="header-title-link">
              <ReactSVG 
                beforeInjection={(svg) => {
                  svg.setAttribute('style', 'height: 70px')
                }}
                src={logo}/>
            </Link>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Header;