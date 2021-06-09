import './App.css';
import { useEffect, useState } from 'react'
import ProductsContainer from './Components/ProductsContainer'
import ProductsContext from './Components/ProductsContext'

// make api 
// Products: http://3.21.164.220/products/list
// Get all reviews: http://3.21.164.220/reviews/?product_id=1/list
//             product_id	integer	Specifies the product for which to retrieve reviews.
//             page	      integer	Selects the page of results to return. Default 1.
//             count	    integer	Specifies how many results per page to return. Default 5.
//             sort	      text	  Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"
// Post a new review: http://3.21.164.220/reviews/?product_id=1

//let url = 'http://3.21.164.220/'
let url = 'http://18.224.200.47/'


function App() {
  const [ products, setProducts] = useState(["Loading"])
  const [ updateProducts, setUpdateProducts ] = useState(false)


  useEffect(async ()=>{
    async function fetchProducts() {
      await fetch( `${url}products/list` )
            .then( (res) => {
              return res.json() 
            })
            .then( json => {
              setProducts(json)
            })
    }

    fetchProducts()
  }, [])


  return (
    <div className="App">
      <h1>गैल्वेनाइज स्टोर</h1>
      <ProductsContext.Provider value={ products }>
        <ProductsContainer/>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;
