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
        this.state= {
            name:"",
            email:"",
            reason:"",
            notes:"",
        }
    }

    private handleNameChange = (name: string) => {
        this.setState({ name });
    };
    private handleEmailChange = (email: string) => {
        this.setState({ email });
    };
    private handleReasonChange = (reason: string) => {
        this.setState({ reason });
    };
    private handleNotesChange = (notes: string) => {
        this.setState({ notes });
    };

    public render(){
        console.log(this.state)
        return(
            <div className="page-container">
                <h1>Contact Us</h1>
                <p>If You Enter your details we'll get 
                    right back to you as soon as possible</p>
                    <Contactus
                    email={this.state.email}
                    onEmailChange={this.handleEmailChange}
                    reason={this.state.reason}
                    onReasonChange={this.handleReasonChange}
                    notes={this.state.notes}
                    onNotesChange={this.handleNotesChange}
                    name={this.state.name}
                    onNameChange={this.handleNameChange}
                    />
            </div>
        )
    }
}

export default ContactUsPage