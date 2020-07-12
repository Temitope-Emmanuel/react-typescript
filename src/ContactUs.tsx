import * as React from "react"
import Form,{minLength,required} from "./Form"


const ContactUs:React.SFC = () => {
    return(
        <Form defaultValue={{
            name:"",email:"",reason:"Support",notes:""
        }}
        validationRules={{
            email:{validator:required},
            // notes:{validator:required},
            // reason:{validator:required},
            name:[{validator:required},{validator:minLength,args:2}]
        }}
        >
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