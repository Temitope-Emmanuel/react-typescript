import * as React from "react";

export interface IValues {
    [key:string]:any;
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
}

interface IErrors {
    [key:string]:string[];
}

export const required : Validator = (
    fieldName:string,values:IValues,args?:any):string => (
     values[fieldName] === undefined || values[fieldName] === null || 
     values[fieldName] === "" ?  "This must be populated" : "");

export const minLength : Validator = (fieldName:string,
    values:IValues,length:number ):string => (
        values[fieldName] && values[fieldName].length < length
        ? `This must be at least ${length} character` : "");

interface IFieldProps {
    name:string;
    label:string;
    type?:"Text" | "Email" | "Select" | "TextArea";
    options?:string[]
}

interface IState {
    values:IValues;
    errors:IErrors
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
            errors
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

    public render(){
        const context:IFormContext = {
            values:this.state.values,
            setValue:this.setValue,
            errors:this.state.errors,
            validate:this.validate
        }
        console.log(this.state.values)
        return(
            <FormContext.Provider value={context}>
                <form className="form" noValidate={true}>
                    {this.props.children}
                </form>
            </FormContext.Provider>
            )
    }
}

Form.Field.defaultProps = {
    type:"Text"
}

export default Form