import * as React from "react"
import {IProduct} from "./ProductsData"
import Tabs from "./Tabs"
import withLoader from "./WithLoader"

interface IProps{
    product?:IProduct;
    inBasket:boolean;
    onAddToBasket: () => void;
}
interface ILikeState {
    likes:number;
    lastLike:Date | null;
}
const initialLikeState : ILikeState = {
    likes:0,
    lastLike:null
}
enum LikeActionTypes {
    LIKE = "LIKE"
}
interface ILikeAction {
    type:LikeActionTypes.LIKE;
    now:Date;
}
type LikeAction = ILikeAction;

const reducer = (state : ILikeState = initialLikeState,
           action:LikeAction) => {
               switch(action.type) {
                   case LikeActionTypes.LIKE:
                       return {...state,likes:state.likes + 1,lastLike:action.now};
                    default: 
                    return state;
               }
}



const Product:React.SFC<IProps> = (props) => {
    const {product,inBasket} = props
    
    const [{likes,lastLike},dispatch]:[
        ILikeState,(action:ILikeAction) => void 
    ] = React.useReducer(reducer,initialLikeState)
    
    const handleAddClick = () => {
        props.onAddToBasket()
    }
    if(!product){
        return null
    }
    const handleLikeClick = () => {
        dispatch({type:LikeActionTypes.LIKE, now:new Date()})
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
           <div className="like-container">
               {
                   likes > 0 && (
                   <div>{`I like this product ${likes}, last at ${lastLike}`}</div>
                   )}

                   <button onClick={handleLikeClick}>
                       {likes > 0 ? "Like Again" : "Like"}
                   </button>
               
           </div>
        </>
    )
}

export default withLoader(Product);