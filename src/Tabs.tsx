import * as React from "react"

interface ITabsContext{
    activeName?:string;
    handleTabClick?:(e:string,a:any) => void;
}
const TabsContext = React.createContext<ITabsContext>({})

interface ITabsProps {
    name:string;
    initialActive?:boolean;
    heading:() => string | JSX.Element
}
interface IState {
    activeName:string;
    activeContent:React.ReactNode;
}

class Tabs extends React.Component<{},IState>{
    public constructor(props:{}){
        super(props)
        this.state = {
            activeName:"",
            activeContent:null
        }
    }

    private handleTabClick = (name:string,content:React.ReactNode) => {
        this.setState({activeName:name,activeContent:content})
    }
    
    public static Tab:React.SFC<ITabsProps> = props => (
        <TabsContext.Consumer>
           {(context:ITabsContext) => {
               if(!context.activeName && props.initialActive){
                   if(context.handleTabClick){
                       context.handleTabClick(props.name,props.children)
                       return null
                   }
               }

               const activeName = context.activeName ? 
               context.activeName : props.initialActive ?
               props.name : "";

               const handleTabClick = (e:React.MouseEvent<HTMLLIElement>) => {
                   if(context.handleTabClick){
                       context.handleTabClick(props.name,props.children)
                   }
               }

               return(
                   <li
                    className={props.name === activeName ? "active" : ""}
                    onClick={handleTabClick}>
                        {props.heading()}
                   </li>
               )
           }}
        </TabsContext.Consumer>
    ) 


    public render(){
        return(
            <TabsContext.Provider 
             value={{
                 activeName:this.state ? this.state.activeName:"",
                 handleTabClick:this.handleTabClick
             }}>
                <ul className="tabs">
                    {this.props.children}
                </ul>
                <div>{this.state && this.state.activeContent}</div>
            </TabsContext.Provider>
        )
    }
}

export default Tabs