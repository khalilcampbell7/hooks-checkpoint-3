import { useContext } from 'react'
import ProductsContext from './ProductsContext'

function ProductsContainer(){
    const products = useContext(ProductsContext)
    console.log('prod cont, products', products)

    let elementArray = `<p>${products}</p>`//products.map( product => <h1>{product}</h1>)
    
    return elementArray
}
    
export default ProductsContainer