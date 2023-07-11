import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import * as S from './style'

//Material Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//Material Icons
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//Assets
import logo from '../../assets/images/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  brand: {
    width: 100,
  },
  bgAppBar: {
    backgroundColor: "white",
    borderTop: "6px solid #2da77a",
    position: 'fixed'
  },
  cusBtn: {
    backgroundColor: "#2da77a",
    borderRadius: "10px",
    color: "#fff !important",
    justifyContent: "center",
    padding: "10px",
    fontSize: "12px"
  },
  cusIcon: {
    fontSize: "12px",
    position: "relative",
    top: "1px"
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar className={classes.bgAppBar} position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <Link to="/"> <img src={logo} alt="Logo" className={classes.brand}/> </Link>
        </IconButton>
        <Typography variant="h6" className={classes.title}></Typography>
        <S.RightSide>
          
          <Link to="/stock" style={{fontSize: "12px"}}> Estoque </Link>
          <Link to="/purchase" className={classes.cusBtn}> Nova Compra  <ArrowForwardIosIcon className={classes.cusIcon}/> </Link>
        </S.RightSide>
      </Toolbar>
    </AppBar>
  </div>
  )
  
}

export default Header;
