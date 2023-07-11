import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

//Material Components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

//Material Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles((theme) => ({
  cuBg: {
    backgroundColor: "#3d3d5e",
    color: 'white',
    marginTop: '40px'
  },
  root: {
    flexGrow: 1,
  },
  boldFont: {
    fontWeight: 'bold',
    fontSize: "17px"
  },
  reduxMargin: {
    marginTop: '-20px'
  },
  lightFont: {
    fontSize: '14px'
  },
  img: {
    width: '150px'
  },
  iconSize: {
    fontSize: '40px'
  },
  noStyle: {
    textDecoration: 'none',
    color: '#fff'
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.cuBg}>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}  justifyContent="space-between">
            <Grid item xs={12} sm={4}>
              <p className={classes.boldFont}> +55 11 3661-17-12 </p>
              <p className={classes.boldFont} style={{ marginTop: '-15px' }}> contato@sahopper.com.br </p>
              <p className={classes.lightFont}> Shopper Comércio Alimentício LTDA </p>
              <p className={classes.lightFont}> CNPJ 24.583.557 / 0001-60 </p>
              <p className={classes.lightFont}> São Paulo - SP </p>

            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <p className={classes.boldFont}> DISPONÍVEL EM </p>
              <a href="https://apps.apple.com/app/id1274216332" target="_blank" >
                <img className={classes.img} src="https://landing.shopper.com.br/img/5a45ba4b531860830ab41ae812250f9a.png" alt="ios"></img>
              </a>
              <a href="https://play.google.com/store/apps/details?id=br.com.shopper.shopperapp&hl=pt_BR" target="_blank" >
                <img className={classes.img} style={{ marginLeft: '15px' }} src="https://landing.shopper.com.br/img/c59325400914d43829ef7706e3879c7c.png" alt="android"></img>
              </a>
              
            </Grid>
            <Grid item xs={12} sm={4}>
              <p className={classes.boldFont}> SOCIAL </p>
              <a href="https://www.facebook.com/shopper.com.br" target="_blank" className={classes.noStyle}>
                <FacebookIcon className={classes.iconSize}/>
              </a> 
              <a href="https://www.instagram.com/shopper.com.br/" target="_blank" className={classes.noStyle}>
                <InstagramIcon className={classes.iconSize} style={{ marginLeft: '15px' }}/>
              </a>
              <MailOutlineIcon className={classes.iconSize} style={{ marginLeft: '15px' }}/>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )

}

export default Footer;
