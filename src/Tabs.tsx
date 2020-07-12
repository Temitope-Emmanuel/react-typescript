import * as React from "react"

interface ITabsContext{
    activeName?:string;
    handleTabClick?:(e:string) => void;
}

const TabsContext = React.createContext<ITabsContext>({})

interface ITabsProps {
    name:string;
    initialActive?:boolean;
}
interface IState {
    activeName:string
}

class Tabs extends React.Component<{},IState>{
    public constructor(props:{}){
        super(props)
        this.state = {
            activeName:""
            // this.props.headings && this.props.headings.length > 0
            // ? this.props.headings[0] : ""
        }
    }
    // private handleTabClick = (e:React.MouseEvent<HTMLElement>) => {
    //     const li = e.target as HTMLLIElement; 
    //     const heading:string = li.textContent ? li.textContent : "";
    //     this.setState({activeName:heading})       
    // }
    public static Tab:React.SFC<ITabsProps> = props =>(
        <li>
            {props.children}
        </li>
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
            </TabsContext.Provider>
        )
    }
}

export default Tabs