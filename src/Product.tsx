import * as React from "react"
import {IProduct} from "./ProductsData"
import Tabs from "./Tabs"
import withLoader from "./WithLoader"

interface IProps{
    product?:IProduct;
    inBasket:boolean;
    onAddToBasket: () => void;
}

const Product:React.SFC<IProps> = (props) => {
    const {product,inBasket} = props

    const handleAddClick = () => {
        props.onAddToBasket()
    }
    if(!product){
        return null
    }
    return(
        <>
            <h1>{product.name}</h1>
            <Tabs>
                <Tabs.Tab name="Description" 
                 initialActive={true} 
                 heading={() => <b>Description</b>}>
                     <p>{product.description}</p>
                 </Tabs.Tab>
                <Tabs.Tab name="Review"
                 heading={() => "Reviews"}
                >
                    <ul className="product-reviews">
                        {
                            product.reviews.map(review => (
                                <li key={review.reviewer}>
                                    <i>"{review.comment}"</i> - {review.reviewer}
                                </li>
                            ))
                        }
                    </ul>
                </Tabs.Tab>
            </Tabs>
            <p className="product-price">
                {new Intl.NumberFormat("en-US", {
                currency: "USD", style: "currency"
            }).format(product.price)}
            </p>
           {!inBasket && (
            <button onClick={handleAddClick}>Add to
            basket</button>
           )}
        </>
    )
}

export default withLoader(Product);