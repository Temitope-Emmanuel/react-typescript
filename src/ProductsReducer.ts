import {Reducer} from "redux"
import {IProductState,ProductsAction,
        ProductsActionTypes} from "./ProductsTypes"

const initialProductState:IProductState = {
    products:[],
    productsLoading:false,
    currentProduct:null
}

export const productsReducer:Reducer<IProductState,
        ProductsAction> = (state = initialProductState,
            action) => {
                switch(action.type){
                    case ProductsActionTypes.LOADING:
                        return {
                            ...state,
                            productsLoading:true
                        }
                    case ProductsActionTypes.GETALL:
                        return {
                            ...state,
                            products:action.products,
                            productsLoading:false
                        }
                    case ProductsActionTypes.GETSINGLE:
                        return {
                            ...state,
                            currentProduct:action.product,
                            productsLoading:false
                        }
                    default:
                        return state
                }
            }