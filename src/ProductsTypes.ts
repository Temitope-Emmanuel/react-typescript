import {IProduct} from "./ProductsData"

export enum ProductsActionTypes {
    GETALL = "PRODUCTS/GETALL",
    LOADING = "PRODUCTS/LOADING",
    GETSINGLE = "PRODUCTS/GETSINGLE"
}

export interface IProductsGetAllAction {
    type:ProductsActionTypes.GETALL,
    products:IProduct[]
}

export interface IProductsLoadingAction {
    type:ProductsActionTypes.LOADING
}
export interface IProductsGetSingleAction {
    type:ProductsActionTypes.GETSINGLE;
    product:IProduct
}

export type ProductsAction = |IProductsGetSingleAction | IProductsGetAllAction | IProductsLoadingAction

export interface IProductState {
    readonly products:IProduct[];
    readonly productsLoading:boolean;
    readonly currentProduct:IProduct | null
}