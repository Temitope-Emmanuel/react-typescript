import * as React from "react"
import Form from "./Form"


const ContactUs:React.SFC = (props) => {
    return(
        <Form defaultValue={{
            name:"",email:"",reason:"Support",notes:""
        }}>
            <Form.Field name="name" label="Your name" />
            <Form.Field name="email" label="Your Email Address" type="Email" />
            <Form.Field name="reason" label="Reason You Need To Contact Us"
             type="Select"
             options={["Marketing","Support","Feedback","Jobs","Other"]} />
             <Form.Field name="notes" label="Additional Notes" type="TextArea" />
        </Form>
        )
}

export default ContactUs