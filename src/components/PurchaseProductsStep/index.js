import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import api from '../../services/api'

//Material Components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Material Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '250px'
  },
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
    marginTop: '50px'
  },
  cusMarginLeft: {
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '10px'
  },
  pos: {
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '15px',
    marginBottom: '40px',
    minHeight: '40px'

  },
  prefix: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    position: 'relative',
    top: '2px'
  },
  price: {
    color: 'rgb(45, 167, 122)',
    lineHeight: 1,
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: '0px',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  btnAdd: {
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(45, 167, 122)',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    padding: '6px 12px',
    marginBottom: '0px',
    lineHeight: '1.42857',
    textalign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundImage: 'none',
    borderRadius: '50px',
    border: '2px solid rgb(45, 167, 122)',
    justifyContent: 'center',
    margin: '0 auto',

  },
  btnAddCart: {
    color: 'rgb(45, 167, 122)',
    fontSize: '30px',
    cursor: 'pointer'

  },
  btnRemoveCart: {
    color: 'rgb(212, 63, 58)',
    fontSize: '30px',
    cursor: 'pointer'
  },
  centerText: {
    textAlign: 'center'
  },
  cusInput: {
    borderRadius: '20px'
  },
  cusDescription: {
    color: '#666',
    fontSize: '11px',
    textalign: 'center',
    marginTop: '15px'
  },
  cusQuantity: {
    fontWeight: 'bold',
    color: 'rgb(45, 167, 122)'
  },
  deleteProducts: {
    borderTop: "1px dashed grey",
    color: "grey",
    cursor: "pointer",
    marginRight: "10px",
    paddingTop: "10px"
  },
  removeIcon: {
    fontSize: "11px",
    position: "relative",
    top: "2px"
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PurchaseProductsStep({ setPropsProducts, valueProducts, productsItems, setPropsTotalAmount, valueTotalAmount, valueLegacyProductsInPurchase }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [statusPurchase, setStatusPurchase] = useState();
  const [products, setProducts] = useState([]);
  const idParams = useParams();

  // Functions used only updated product 
  function setQuantityProducts() {
    valueProducts.forEach(currentValueProduct => {
      let position = productsItems.map(function (e) { return e._id; }).indexOf(currentValueProduct.id);
      setTimeout(() => {
        hideElement(`btn_${position}`, `card_${position}`,)
        let current_input = document.getElementById(`input_${position}`)
        current_input.value = currentValueProduct.quantity;
        document.getElementById(`max_quantity_error_${position}`).style.display = "none";
        setProducts(valueProducts)
      }, 1200);
    });
  }

  async function deleteProduct( product, hide, show) {
    let position = products.map(function (e) { return e.id.toString(); }).indexOf(product._id);
    let aux_products = []
    for (let index = 0; index < products.length; index++) if (index !== position ) aux_products.push(products[index])
    setPropsTotalAmount(valueTotalAmount - products[position].amount_of_product);
    setProducts(aux_products);
    hideElement(hide, show);

    await api.delete(`/purchaseRequestProduct/${products[position].id_purchase_request_products}/${idParams.id}`, 
    {
      amount_of_product: products[position].amount_of_product
    }).then((result) => {
      console.log(result)
    })
  }

  function generateFieldCart(hide, show, product, input_id, max_quantity_id) {
    setOpen(true);
    setStatusPurchase("adicionado ao")
    setPropsTotalAmount(valueTotalAmount + product.price)

    setTimeout(() => {
      hideElement(hide, show)
      document.getElementById(max_quantity_id).style.display = "none";
    }, 100);

    let product_quantity = document.getElementById(input_id);
    product_quantity.value = 1;

    let productObj = { id: product._id, quantity: 1, price: product.price }
    setProducts([...products, productObj]);
    setPropsProducts(products);
  };

  // Increment / Decrement functions 
  function incrementCart(input_id, product, max_quantity_id) {
    let product_quantity = document.getElementById(input_id);
    if (parseInt(product_quantity.value) === product.qty_stock) return generateAlert(max_quantity_id);
    if(idParams.id) {
      let position = valueLegacyProductsInPurchase.map(function (e) { return e.id.toString(); }).indexOf(product._id);

      if(position !== -1) 
        if ( parseInt(product_quantity.value) - parseInt(valueLegacyProductsInPurchase[position].quantity) === product.qty_stock) return generateAlert(max_quantity_id)
    }
     
    product_quantity.value = parseInt(product_quantity.value) + 1;
    setStatusPurchase("adicionado ao");
    setOpen(true);

    let aux_products = []
    products.forEach(current_product => {
      if (current_product.id === product._id) 
        aux_products.push(
          { 
            id: current_product.id, 
            quantity: parseInt(product_quantity.value), 
            price: current_product.price, 
            id_purchase_request_products: current_product.id_purchase_request_products 
          }
        )
      else aux_products.push(current_product)
    });

    setPropsTotalAmount(valueTotalAmount + product.price)
    setProducts(aux_products);
  }

  function decrementCart(input_id, product, hide, show) {
    setOpen(true);
    setStatusPurchase("removido do");

    let product_quantity = document.getElementById(input_id);
    product_quantity.value = parseInt(product_quantity.value) - 1;
    if (parseInt(product_quantity.value) === 0) hideElement(hide, show);
    
    let aux_products = []
    products.forEach(current_product => {
      if (current_product.id === product._id) 
      aux_products.push(
        { 
          id: current_product.id, 
          quantity: parseInt(product_quantity.value), 
          price: current_product.price,
          id_purchase_request_products: current_product.id_purchase_request_products 
      })
      else aux_products.push(current_product)
    });

    setPropsTotalAmount(valueTotalAmount - product.price);
    setProducts(aux_products);
  }
  
  //aux functions 
  function currencyFormat(num) {
    return num.toFixed(2).replace('.', ',')
  }

  function generateId(name, index) {
    return `${name}_${index}`
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function hideElement(hide, show) {
    document.getElementById(hide).style.display = "none";
    document.getElementById(show).style.display = "block";
  }

  function generateAlert(id) {
    let oldAlert = document.getElementById(`max_quantity_${id}`);
    oldAlert.style.display = "none";
    let newAlert = document.getElementById(`max_quantity_error_${id}`);
    newAlert.style.display = "block";

    setTimeout(() => {
      newAlert.style.display = "none";
      oldAlert.style.display = "block";
    }, 3000);
  }

  useEffect(() => { 
    setPropsProducts(products)
  }, [products]);

  useEffect(() => { 
    setQuantityProducts(); 
  }, []);

  return (

    <Grid container spacing={3}>
      {
        productsItems.map((product, index) => (
          <Grid item xs={12} sm={12} md={3} key={index}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.pos} color="textSecondary">
                  {product.name}
                </Typography>
                <Typography variant="body2" component="p" className={classes.centerText}>
                  <span className={classes.prefix}> R$ </span> <span className={classes.price}> {currencyFormat(product.price)} </span>
                </Typography>
              </CardContent>
              <CardActions id={generateId('btn', index)} textalign='center' >
              { product.qty_stock > 0 && (
                <Button size="small" className={classes.btnAdd} onClick={() => generateFieldCart(`btn_${index}`, `card_${index}`, product, `input_${index}`, `max_quantity_error_${index}`)}> <AddIcon /> Adicionar </Button>
              )}
              { product.qty_stock <= 0 && (
                <Button size="small" className={classes.btnAdd}> Esgotado :c </Button>
              )}
                
              </CardActions>

              <CardActions className="cardInput" id={generateId('card', index)} textalign='center' >
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                  <Grid item xs={2} >
                    <RemoveCircleIcon
                      className={classes.btnRemoveCart}
                      onClick={() => decrementCart(`input_${index}`, product, `card_${index}`, `btn_${index}`)}
                    />
                  </Grid>
                  <Grid item xs={4} >
                    <TextField
                      className={classes.cusInput}
                      id={generateId('input', index)}
                      aria-readonly={true}
                      inputProps={{ min: 0, readOnly: true, style: { textAlign: 'center' } }}
                    />
                  </Grid>
                  <Grid item xs={2} >
                    <AddCircleIcon
                      className={classes.btnAddCart}
                      onClick={() => incrementCart(`input_${index}`, product, index)} />
                  </Grid>
                </Grid>
                
                <p className={classes.cusDescription} id={generateId('max_quantity', index)} >
                  A quantidade máxima para esse item é <span className={classes.cusQuantity}> {product.qty_stock} </span>. <br/>
                  { idParams.id && (
                    <p className={classes.deleteProducts} onClick={() => deleteProduct(product, `card_${index}`, `btn_${index}`)}> 
                    Remover produto <DeleteIcon className={classes.removeIcon}/>
                    </p>
                  )}
                  
                </p>
                <p className={classes.cusDescription} id={generateId('max_quantity_error', index)}>
                  Ops, você já selecionou a quantidade máxima do produto, que é: <span className={classes.cusQuantity}> {product.qty_stock} </span>.
                </p>
              </CardActions>
            </Card>
          </Grid>
        ))
      }

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" style={{ fontSize: '12px' }}>
          O produto foi {statusPurchase} carrinho.<br />
          <span >Valor total da compra <strong> R$ {currencyFormat(valueTotalAmount)}</strong> </span>
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default PurchaseProductsStep;