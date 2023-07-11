import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

//Material Components
import Divider from '@material-ui/core/Divider';

const columns = [
  {
    field: 'name',
    headerName: 'Nome do Produto',
    width: 500,
    editable: true,
  },
  {
    field: 'qty_stock',
    headerName: 'Quantidade em estoque',
    width: 250,
    editable: true,
  }
];

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


function ProductsTable({ products }) {
  const classes = useStyles();

  return (
    <div className={classes.cusMarginTop}>
      <div className={classes.cusMarginLeft}>
        <h2> Estoque</h2>
        <p className={classes.cusSubTitle}> Verifique a quantidade de itens disponíveis no estoque</p>
        <Divider />
      </div>
      <Container maxWidth="lg" style={{ marginBottom: '100px' }}>
        <div style={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={products}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
          />
        </div>
      </Container>
    </div>
  )
}

export default ProductsTable;