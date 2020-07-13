import {ActionCreator,AnyAction,Dispatch, Action} from "redux";
import {ThunkAction} from "redux-thunk";

import {getAsyncProduct as getProductsFromAPI} from "./ProductsData"
import {IProductsGetAllAction,IProductsLoadingAction
       ,IProductState,ProductsActionTypes} from "./ProductsTypes"

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