import React, {useState, useEffect} from 'react'
import api from '../../services/api'

//General Components 
import ProductsTable from '../../components/ProductsTable'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function Stock() {
  
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    await api.get(`/product`)
    .then((result) => {
      
      setProducts(result.data);
      
    }).catch((err) => {
      console.log("Erro inesperado.")   
    });
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <Header/>
      <ProductsTable products={products} />
      <Footer/>
    </div>
  )
}

export default Stock;
