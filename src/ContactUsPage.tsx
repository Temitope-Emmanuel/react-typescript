import * as React from "react"
import Contactus from "./ContactUs"
import { IValues, ISubmitResult } from "./Form"
import { wait } from "./ProductsData"


interface IState { 
    name:string;
    email:string;
    reason:string;
    notes:string;
}


class ContactUsPage extends React.Component<{},IState>{
    constructor(props:{}){
        super(props)
       }

       private handleSubmit = async (values:IValues):Promise<ISubmitResult> => {
           await wait(1000)
           return{
               errors:{
                   email:["something went wrong"]
               },
               success:false
           }
       }
    public render(){
        return(
            <div className="page-container">
                <h1>Contact Us</h1>
                <p>If You Enter your details we'll get 
                    right back to you as soon as possible</p>
                    <Contactus onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default ContactUsPage