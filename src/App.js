import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import ProductsContainer from './Components/ProductsContainer'
import ProductsContext from './Components/ProductsContext'

// make api 
// Products: http://3.21.164.220/products
// Get all reviews: http://3.21.164.220/reviews/?product_id=1/list
//             product_id	integer	Specifies the product for which to retrieve reviews.
//             page	      integer	Selects the page of results to return. Default 1.
//             count	    integer	Specifies how many results per page to return. Default 5.
//             sort	      text	  Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"
// Post a new review: http://3.21.164.220/reviews/?product_id=1

let url = 'http://3.21.164.220/'


async function fetchProducts() {
  const products = await fetch( `${url}products` )
                      .then( res => res.json())
  return await products
}


function App() {
  const [ products, setProducts] = useState(fetchProducts())
  console.log('products', products)
  
  //let contextObject = { products:products }

  return (
    <div className="App">
      <ProductsContext.Provider value={ products }>
        <ProductsContainer/>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;
