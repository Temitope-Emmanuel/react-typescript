import * as React from "react"
import {IProduct} from "./ProductsData"
import Tabs from "./Tabs"

interface IProps{
    product:IProduct;
    inBasket:boolean;
    onAddToBasket: () => void;
}

const Product:React.SFC<IProps> = (props) => {
    const {product,inBasket} = props

    const handleAddClick = () => {
        props.onAddToBasket()
    }
    return(
        <>
            <h1>{product.name}</h1>
            <Tabs headings={["Description","Reviews"]} />
            <p>{product.description}</p>
            <div>
                <ul className="product-reviews">
                    {product.reviews.map(review => (
                        <li key={review.reviewer} className="product-reviews-item">
                            <i>"{review.comment}"</i> - {review.reviewer}
                        </li>
                    ))}
                </ul>
            </div>
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

export default Product;