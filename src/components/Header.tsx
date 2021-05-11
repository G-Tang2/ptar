import React from "react";
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ReactSVG } from 'react-svg';
import logo from "../img/logo-epworth.svg";
import { Button } from "@material-ui/core";


function Header(props) {
  const handleClick = () => {
    props.setPatientId("");
  }
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
          <Link to={"/"} className='button-link' onClick={handleClick}>
            <Button variant="contained" color="secondary" size="small">LOG OUT</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Header;