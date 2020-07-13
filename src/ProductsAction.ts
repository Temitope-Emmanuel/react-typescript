import {ActionCreator,AnyAction,Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {getAsyncProduct as getProductsFromAPI,
      getProduct as getProductFromAPI} from "./ProductsData"

import {IProductsGetAllAction,IProductsLoadingAction
       ,IProductState,ProductsActionTypes,IProductsGetSingleAction
    } from "./ProductsTypes"

const loading:ActionCreator<IProductsLoadingAction> = () => {
    return {
        type:ProductsActionTypes.LOADING
    }
}

export const getProducts:
        ActionCreator<ThunkAction<Promise<AnyAction>,
        IProductState,null,IProductsGetAllAction>> = () => {
            return async (dispatch:Dispatch) => {
             dispatch(loading())
             const products = await getProductsFromAPI()
             return dispatch({
                 products,
                 type:ProductsActionTypes.GETALL
             })   
            }
}

export const getProduct:ActionCreator<ThunkAction<Promise<any>,IProductState,
    null,IProductsGetSingleAction>> = (id:number) =>{
        return async (dispatch :Dispatch) => {
            dispatch(loading())
            const product = await getProductFromAPI(id)
            dispatch({
                product,
                type:ProductsActionTypes.GETSINGLE
            })
        }
    }
    