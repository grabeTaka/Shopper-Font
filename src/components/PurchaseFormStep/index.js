import React from 'react';

//Material Components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


function PurchaseFormStep({ setPropsName, valueName, setPropsPurchase, valuePurchase }) {

  return (
    <Grid container spacing={3}>

      <Grid item xs={12} sm={7} >
        <TextField
          id="outlined-basic"
          label="Nome Completo"
          variant="outlined"
          fullWidth
          onChange={e => setPropsName(e.target.value)}
          value={valueName}
          key="Confirmation Code"
          autoFocus={true}

        />
      </Grid>

      <Grid item xs={12} sm={7}>
        <TextField
          id="date"
          label="Data de Entrega"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          fullWidth
          onChange={e => setPropsPurchase(e.target.value)}
          value={valuePurchase}
        />
      </Grid>
    </Grid>

  )
}

export default PurchaseFormStep;