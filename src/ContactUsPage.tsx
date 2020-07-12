import * as React from "react"
import Contactus from "./ContactUs"

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

    public render(){
        return(
            <div className="page-container">
                <h1>Contact Us</h1>
                <p>If You Enter your details we'll get 
                    right back to you as soon as possible</p>
                    <Contactus/>
            </div>
        )
    }
}

export default ContactUsPage