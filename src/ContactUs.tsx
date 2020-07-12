import * as React from "react"

interface IProps { 
    name:string;
    onNameChange:(e) => void;
    email:string;
    onEmailChange:(e) => void;
    reason:string;
    onReasonChange:(e) => void;
    notes:string;
    onNotesChange:(e) => void;
}


const ContactUs:React.SFC<IProps> = (props) => {
    // const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    //     props.handleChange(e)
    // }
    const handleNameChange =(e:React.ChangeEvent<HTMLInputElement>) => {
        props.onNameChange(e.currentTarget.value)
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onEmailChange(e.currentTarget.value);
    };
    const handleReasonChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        props.onReasonChange(e.currentTarget.value);
    };
    const handleNotesChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onNotesChange(e.currentTarget.value);
    };
    return(
        <form className="form" noValidate={true} >
            <div className="form-group">
                <label htmlFor="name" >Your Name</label>
                <input onChange={handleNameChange} value={props.name} type="text" id="name" />
            </div>
            <div className="form-group">
                <label
                htmlFor="reason">Reason You Need to Contact Us</label>

                <select id="reason" onChange={handleReasonChange}
                 value={props.reason}>
                    <option value="Marketing">Marketing</option>
                    <option value="Support">Support</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Jobs">Jobs</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="notes" >Additional notes</label>
                <textarea id="notes" value={props.notes}
                 onChange={handleNotesChange}/>
            </div>
        </form>
    )
}

export default ContactUs