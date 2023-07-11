import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api'
import { format } from 'date-fns'
import { useParams } from "react-router-dom";

//Material Ui Components
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import MuiAlert from '@material-ui/lab/Alert';

//General Components
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PurchaseFormStep from '../../components/PurchaseFormStep'
import PurchaseProductsStep from '../../components/PurchaseProductsStep';

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
    backgroundSize: 'cover',
    backgroundPositionY: '-10%'
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
  noStyle: {
    backgroundColor: "transparent"
  },
  cusBtn: {
    color: '#3f51b5',
    cursor: 'pointer'
  }
}));

function getSteps() {
  return ['Dados pessoais', 'Lista de compra'];
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PurchaseRequest() {
  const [name, setName] = useState();
  const [purchaseDate, setPurchaseDate] = useState();

  const [totalAmount, setTotalAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const [legacyProductsInPurchase, setLegacyProductsInPurchase] = useState([]);
  
  const [productsItems, setProductsItems] = useState([]);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const idParams = useParams()
  const [titlePage, setTitlePage] = useState("Cadastrar novo cliente");
  const [SubTitlePage, setSubTitlePage] = useState("Registre um novo cliente e sua lista de compras.");
  const classes = useStyles();

  async function loadProducts() {
    await api.get(`/product`)
    .then((result) => {
      setProductsItems(result.data);
      
    }).catch((err) => {
      console.log("Erro inesperado.")   
    });
  }
  
  async function loadPurchaseProducts() {
    await api.get(`/purchaseRequest/${idParams.id}`).then((result) => {
      setName(result.data.user_name)
      setPurchaseDate(format(new Date(result.data.delivery_date), "yyyy-MM-dd"))

      let products = [];
      let totalAmount = 0;
      result.data.purchaseRequestProducts.forEach(purchase => {
        products.push(
          {
            quantity: purchase.quantity, 
            id: purchase.product._id, 
            amount_of_product: purchase.amount_of_product, 
            price: purchase.product.price,
            id_purchase_request_products: purchase._id
          })
            totalAmount = totalAmount + purchase.quantity * purchase.product.price
          }
        );
      setProducts(products)
      setLegacyProductsInPurchase(products)
      setTotalAmount(totalAmount)
    }).catch((err) => {
      console.log(err)
    });
  }

  async function createPurchaseProducts() {
    
    let dt = new Date(purchaseDate)
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    let filtered_produts = [] 
    products.forEach(product => {
      if(product.quantity > 0 ) filtered_produts.push(product)
    });
    
    await api.post(`/purchaseRequestProduct`, 
    {
      purchaseRequest: {
        user_name: name,
        delivery_date: `${format(new Date(dtDateOnly), "yyyy-MM-dd")}T15:00:00.000`,
        total_amount: totalAmount
      },
      products: filtered_produts
    })
    .then((result) => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

    }).catch((err) => {
      console.log("Erro inesperado.")   
      console.log(err)
    }); 
  }

  async function updatePurchaseProducts() {
    let dt = new Date(purchaseDate)
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);

    await api.put(`/purchaseRequestProduct/${idParams.id}`, 
    {
      purchaseRequest: {
        user_name: name,
        delivery_date: `${format(new Date(dtDateOnly), "yyyy-MM-dd")}T15:00:00.000`,
        total_amount: totalAmount
      },
      products: products
    })
    .then((result) => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      
      
    }).catch((err) => {
      console.log("Erro inesperado.")   
      console.log(err)
    }); 
  }

  const handleNext = () => {
    if(activeStep + 1 === steps.length) {
      idParams.id ? updatePurchaseProducts() : createPurchaseProducts();

    } else {
      if(!name) return setError('Por favor, insira o nome completo do cliente.');
      if(!purchaseDate) return setError("Por favor, insira a data de entrega da compra.");
      if(new Date (purchaseDate) < new Date()) return setError("Ops, a data inserida não é válida, por favor, insira uma data futura.");
      continueActions(); 
    }
  };

  const continueActions = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setError(null);
    setTimeout(() => {
      let els = document.getElementsByClassName('cardInput')
      for (let index = 0; index < els.length; index++) {
        els[index].style.display = "none";
      }
    }, 100);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setName("");
    setPurchaseDate("");
    setTotalAmount(0);
    setProducts([]);
    setActiveStep(0);
  };
  
  useEffect(() => {
    loadProducts();
    if( idParams.id ) {
      setTitlePage("Atualizar dados do cliente")
      setSubTitlePage("Atualize os dados do cliente e sua lista de compras.")
      loadPurchaseProducts();
    }
  }, []);

  
  return (
    <div>
      <Header className={classes.fixedBar}/>
      <Container maxWidth="lg" className={classes.cusMarginTop}>
        <div className={classes.cusMarginLeft}>
          <h2> {titlePage}</h2>
          <p className={classes.cusSubTitle}> {SubTitlePage}</p>
          <Divider />
        </div>
        
        <div className={classes.root}>
          {error != null && (
            <Alert severity="error" className={classes.cusMarginLeft}>{error}</Alert>
          )}
        
          <Stepper activeStep={activeStep} orientation="vertical" className={classes.noStyle}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  
                  <div className={classes.actionsContainer}>
                    <div>
                      

                      {activeStep === 0 && (
                        <PurchaseFormStep 
                          setPropsName={setName} 
                          valueName={name} 
                          setPropsPurchase={setPurchaseDate} 
                          valuePurchase={purchaseDate}
                        />
                      )}

                      {activeStep === 1 && (
                        <PurchaseProductsStep 
                          setPropsProducts={setProducts} 
                          valueProducts={products}
                          productsItems={productsItems}
                          setPropsTotalAmount={setTotalAmount}
                          valueTotalAmount={totalAmount}
                          valueLegacyProductsInPurchase={legacyProductsInPurchase}
                        />
                      )}
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={7}>
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Voltar
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1 ? 'Finalizar Carrinho' : 'Próxima Etapa'}
                          </Button>                        
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Alert variant="outlined" severity="success">
              Cliente cadastrado com sucesso! <span onClick={handleReset} className={classes.cusBtn}>Clique aqui</span>  para continuar cadastrando.
            </Alert>
          )}
        </div>
      </Container>
    <Footer/>
    </div> 
  );
}