import { useContext, useState, useEffect } from 'react'
import ProductsContext from './ProductsContext'

function ProductsContainer(){
    const products = useContext(ProductsContext)
    const [ selectedItem, setSelectedItem ] = useState(-1);
    const [ imgURL, setImgURL ] = useState("");
    console.log('prod cont, products', products)


    const handleClick=(e)=>{
        setImgURL("");
        if(selectedItem !== Number(e.target.id)){
            setSelectedItem(Number(e.target.id))} 
        else {
            setSelectedItem(-1)}}


    useEffect(async ()=>{
        async function fetchImage(){
            if(selectedItem !== -1){
                let url = `http://18.224.200.47/products/${products[selectedItem].id}/styles/`
                console.log('inside fetchImage', url)
                await fetch( url )
                    .then( res => res.json() )
                    .then( json => {
                        if(json.results[0].photos[0].thumbnail_url === null){
                            setImgURL("https://media.giphy.com/media/LXONhtCmN32YU/giphy.gif");} 
                        else {
                            setImgURL(json.results[0].photos[0].thumbnail_url)}})
            } else {
                setImgURL("");}}


        fetchImage()
      }, [selectedItem])



    const conditionalHTML = (index) => {
        // let url = 'http://18.224.200.47/products/${products[index].id}/styles/'
        // url/products/${products[index].id}/styles/
        // res.results[0].photos[0].thumbnail_url
        console.log(`if(${index}===${selectedItem})`)
        return (index === selectedItem) ? 
            <div className="popupContainer">
                <div className="left">
                    <p id={index}>Slogan: {products[index].slogan}</p>
                    <p id={index}>Category: {products[index].category}</p>
                    <p id={index}>Price: <strike>{parseFloat(products[index].default_price*72.95).toFixed(2)} INR</strike> <b>{parseFloat(products[index].default_price*.9*72.95).toFixed(2)} INR</b></p>
                    <input type="button" value="🛒 Buy Now" onClick={(e)=>{
                        const purchaseLink = `https://www.paypal.com/donate?business=3UG2SDXKDZXAE&amount=${parseFloat(products[index].default_price*.9).toFixed(2)}&currency_code=USD`
                        e.preventDefault()
                        window.open(purchaseLink)
                    }} />
                </div>
                <div className="right">
                    <img id={index} src={imgURL} />
                </div>
            </div>
            :
            //<p id={index}>Click to expand</p>
            <></>
        }

    let elementArray = products.map((item, index) => {
        return (
        <div className="productCard" id={index} onClick={ e => handleClick(e) }>
            <h2 id={index}>{item.name}</h2>
            <p id={index}>{item.description}</p>
            {conditionalHTML(Number(index))}
        </div>
    )})
    
    return elementArray
}
    
export default ProductsContainer