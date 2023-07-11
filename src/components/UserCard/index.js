import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

//Material components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//Material Icons
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles({
  iconPerson: {
    fontSize: '50px',
    color: "#808080"
  },
  deleteIcon: {
    color: `rgb(212, 63, 58)`,
    cursor: 'pointer'
  },
  viewIcon: {
    color: `#808080`,
    cursor: 'pointer',
    fontSize: '15px'
  },
  prefix: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    position: 'relative',
    top: '10px',

  },
  price: {
    color: 'rgb(45, 167, 122)',
    lineHeight: 1,
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: '0px',
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '18px'

  },
  cusMt: {
    borderTop: "1px dashed #808080"
  },
  viewCart: {
    fontSize: '14px',
    marginLeft: '3px',
    position: 'relative',
    top: '-3px'
  },
  deliveryDate: {
    fontSize: "10px",
    textAlign: 'right'
  },
  root: {
    textDecoration: 'none'
  }

});

function currencyFormat(num) {
  if (num === null || num < 0) return "0,00"
  return num.toFixed(2).replace('.', ',')
}

function UserCard({ user_name, delivery_date, id, total_amount }) {
  const classes = useStyles();
  const date = useMemo(() => format(new Date(delivery_date), 'dd/MM/yyyy'));
  return (

    <Grid item xs={12} sm={3}>
      <Link to={`/purchase/${id}`} className={classes.root}>
        <Card >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <center>
                  <PersonIcon className={classes.iconPerson} />
                </center>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <center>
                  Nome do cliente: {user_name} <br />
                  <span className={classes.prefix}>R$</span> <span className={classes.price}>{currencyFormat(total_amount)}</span>
                </center>
              </Typography>
            </CardContent>

            <CardActions className={classes.cusMt}>
              <Grid container direction="row" justifyContent="space-around" alignItems="center" >
                <Grid item xs={12} sm={8}>
                  <ShoppingCartIcon className={classes.viewIcon} />
                  <span className={classes.viewCart}> Visualizar carrinho </span>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.deliveryDate}>
                  {date}
                </Grid>
              </Grid>
            </CardActions>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>


  )
}

export default UserCard;