import {Reducer} from "redux"
import {BasketAction,BasketActionTypes,IBasketState} from "./BasketTypes"

const initialBasketState: IBasketState = {
    products:[]
}

export const basketReducer:Reducer<IBasketState,BasketAction> = (
    state=initialBasketState,action) => {
        switch(action.type){
            case BasketActionTypes.ADD:
                return {
                    ...state,
                    products:state.products.concat(action.product)
                }
            default:
                return state || initialBasketState
        }
    }