import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api'
import {Link} from 'react-router-dom'

//Material Components
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';


//General Components
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import UserCard from '../../components/UserCard'

const useStyles = makeStyles((theme) => ({

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  cusMarginTop: {
    paddingTop: '100px',
    backgroundImage: `url(https://landing.shopper.com.br/img/eda073f5d7e6ebd9b97261a85254f4ff.png)`,
    backgroundSize: 'contain',
    backgroundPositionY: '-10%',
    minHeight: '100vh',
  },
  cusMarginLeft: {
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '10px'
  },
  rootGrid: {
    flexGrow: 1,
  },
  cusTitle: {
    color: '#1F1F1F'
  },
  cusSubTitle: {
    color: '#1F1F1F',
    fontSize: "12px",
    marginTop: "-10px"
  },

}));


function Home() {
  const classes = useStyles();
  const [purchaseRequests, setPurchaseRequests] = useState([]);

  async function loadPurchaseRequest() {
    await api.get(`/purchaseRequest`)
      .then((result) => {
        setPurchaseRequests(result.data);
      }).catch((err) => {

      });
  }

  useEffect(() => {
    loadPurchaseRequest();
  }, []);

  return (
    <div>
      <Header />
      <Container maxWidth="lg" className={classes.cusMarginTop}>
        <div className={classes.cusMarginLeft}>
          <h2 className={classes.cusTitle}> Clientes cadastrados</h2>
          <p className={classes.cusSubTitle}> Visualize e gerencie os clientes cadastrados e suas listas de compras.</p>
          <Divider />
        </div>

        <div className={classes.cusMarginLeft}>
          <Grid container direction="row" spacing={3} justifyContent="center" alignItems="center">
            {
              purchaseRequests.map((purchaseRequest, index) => (
                <UserCard
                  key={index}
                  user_name={purchaseRequest.user_name}
                  delivery_date={purchaseRequest.delivery_date}
                  id={purchaseRequest._id}
                  total_amount={purchaseRequest.total_amount}
                />
              )) 
            }

            {purchaseRequests.length === 0 && (
              <Alert severity="info" style={{width: "100%", marginTop: '30px'}}>
                Você ainda não cadastrou nenhum cliente, mas não fique triste <Link to="/purchase">comece agora</Link>!
              </Alert>
            )}

          </Grid>
        </div>
      </Container>

      <Footer />
    </div>
  )

}

export default Home;
