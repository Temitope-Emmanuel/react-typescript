import * as React from "react";

export interface IValues {
    [key:string]:any;
}

export interface ISubmitResult {
    success:boolean;
    errors?:IErrors;
}
export const required : Validator = (fieldName:string,values:IValues):
   string => (
     values[fieldName] === undefined || values[fieldName] === null || 
     values[fieldName] === "" ?  "This must be populated" : ""
);
export const minLength : Validator = (fieldName:string,values:IValues,
    length:number ):string => (
        values[fieldName] && values[fieldName].length < length
        ? `This must be at least ${length} character` : ""
);

interface IErrors {
    [key:string]:string[];
}

type Validator = (
    fieldName:string,
    values:IValues,
    args?:any
) => string
interface IValidation {
    validator:Validator;
    args?:any
}
interface IValidationProp {
    [key:string]:IValidation | IValidation[]
}

interface IFormProps{
    defaultValue:IValues;
    validationRules:IValidationProp;
    onSubmit : (values:IValues) => Promise<ISubmitResult>
}
interface IState {
    values:IValues;
    errors:IErrors;
    submitting:boolean;
    submitted:boolean;
}
        
interface IFieldProps {
    name:string;
    label:string;
    type?:"Text" | "Email" | "Select" | "TextArea";
    options?:string[]
}
interface IFormContext {
    errors:IErrors;
    values:IValues;
    setValue?:(fieldName:string,value:any) => void;
    validate?:(fieldName:string,value:any) => string[]
}
const FormContext = React.createContext<IFormContext>({
    values:{},
    errors:{}
})

export class Form extends React.Component<IFormProps,IState>{
    constructor(props:IFormProps){
        super(props)
        const errors : IErrors = {};
        Object.keys(props.defaultValue).forEach(fieldName => {
            errors[fieldName] = []
        })
        this.state = {
            values:props.defaultValue,
            errors,
            submitted:false,
            submitting:false
        };
    }
    public static Field:React.SFC<IFieldProps> = props => {
        const {name,label,type,options} = props

        const handleChange = (
            e:React.ChangeEvent< | HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>,
            context:IFormContext) => {
                if(context.setValue){
                    context.setValue(props.name,e.currentTarget.value)
                }
            }
        const handleBlur = (
            e:React.FocusEvent< | HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>,
            context:IFormContext) => {
                if(context.validate){
                    context.validate(props.name,e.currentTarget.value)
                }
            }

        return(
            <FormContext.Consumer>
                {context => (
                    <div className="form-group">
                    <label htmlFor={name}>{label}</label>
                    {(type === "Text" || type === "Email") && (
                        <input id={name} type={type?.toLowerCase()}
                         onBlur={(e) => handleBlur(e,context)}
                         value={context.values[name]} onChange={e => handleChange(e,context)}/>
                    )}
                    {(type === "TextArea" && (
                        <textarea id={name} onChange={e => handleChange(e,context)}
                        onBlur={(e) => handleBlur(e,context)}
                        value={context.values[name]}/>
                    ))}
                    {(type === "Select" && (
                        <select value={context.values[name]}
                         onBlur={(e) => handleBlur(e,context)}
                         onChange={e => handleChange(e,context)}>
                            {options &&
                            options.map(option => (
                                <option key={option} value={option} >
                                    {option}
                                </option>
                            ))}
                        </select>
                    ))}
                    {context.errors[name] && 
                      context.errors[name].length > 0 &&
                      context.errors[name].map(error => (
                          <span key={error} className="form-error">
                              {error}
                          </span>
                      ))}
                </div>
                )}
            </FormContext.Consumer>
        )
    }

    private setValue = (fieldName:string,value:any) => {
        const newValues = {...this.state.values,[fieldName]:value}
        this.setState({values:newValues})
    }

    private validate =(fieldName:string,value:any):string[]=>{
        const rules = this.props.validationRules[fieldName]
        const errors:string[] = [];      
        if(rules === undefined) return errors;
        if(Array.isArray(rules)){
            rules.map(rules => {
                const error = rules.validator(
                    fieldName,this.state.values,rules.args)
                if(error){
                    errors.push(error)
                }
            })
        }else{
            const error = rules.validator(
                fieldName,this.state.values,rules.args);
                if(error){
                    errors.push(error)
                }
        }
        const newErrors = {...this.state.errors ,[fieldName]:errors}
        this.setState({errors:newErrors})
        return errors
    }
    private isValidForSubmit():boolean {
        const errors:IErrors = {};
        let hasError:boolean = true;
        Object.keys(this.props.defaultValue).map(fieldName => {
            errors[fieldName] = this.validate(
                fieldName,this.state.values[fieldName]
            );
            if(errors[fieldName].length > 0){
                hasError =  false;
                this.setState({errors})
            }
        })
        return hasError
    }

    private handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(this.isValidForSubmit()){
            this.setState({submitting:true})
            const result = await this.props.onSubmit(this.state.values)
            this.setState({
                errors:result.errors || {},
                submitted:result.success,
                submitting:false
            },() => {
                if(this.state.submitted){
                    const values = Object.keys(this.state.values).reduce((a,b) => {
                        a[b] = ""
                        return {...a}
                    },{})
                    this.setState({
                        values:values
                    })
                }
            })
        }else{
            alert("Please Clear All Errors")
        }
    }

    public render(){
        const context:IFormContext = {
            values:this.state.values,
            setValue:this.setValue,
            errors:this.state.errors,
            validate:this.validate
        }
        return(
            <FormContext.Provider value={context}>
                <form onSubmit={this.handleSubmit} className="form" noValidate={true}>
                    {this.props.children}
                    <div className="form-group">
                        <button disabled={this.state.submitting || this.state.submitted} 
                         type="submit">Submit</button>
                    </div>
                </form>
            </FormContext.Provider>
            )
    }
}

Form.Field.defaultProps = {
    type:"Text"
}

export default Form