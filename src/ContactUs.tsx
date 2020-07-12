import * as React from "react"
import Form,{minLength,required,ISubmitResult,IValues} from "./Form"

interface IProps {
    onSubmit : (values:IValues) => Promise<ISubmitResult>
}

const ContactUs:React.SFC<IProps> = (props) => {
    
    const handleSubmit = async (values:IValues):Promise<ISubmitResult> => {
        const result = await props.onSubmit(values)
        return result
    }

    return(
        <Form defaultValue={{
            name:"",email:"",reason:"Support",notes:""
        }}
        onSubmit={handleSubmit}
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