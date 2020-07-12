import React,{Suspense} from "react";
import {BrowserRouter as Router,RouteComponentProps,
    Switch,Route,Redirect} from "react-router-dom"
import {CSSTransition,TransitionGroup} from "react-transition-group"
import Header from "./Header"
import ProductsPage from './ProductsPage'
import ProductPage from "./ProductPage"
import LoginPage from "./LoginPage"
import ContactUsPage from "./ContactUsPage"
import "./index"
const AdminPage = React.lazy(() => import ("./AdminPage"))


interface IState {
    loggedIn:boolean
}

const RoutesWrap:React.SFC = () => {
    return(
        <Router>
            <Route component={Routes}/>
        </Router>
    )
}

    class Routes extends React.Component<RouteComponentProps,IState>{
        constructor(props:RouteComponentProps){
            super(props)
            this.state = {
                loggedIn:true
            }
        }

        render(){
            return(
                <div>
                    <Header/>
                    <TransitionGroup>
                        <CSSTransition
                          timeout={500}
                          classNames="animate"
                          key={this.props.location.key}>
                        <Switch>
                        <Route exact path="/products"
                         component={ProductsPage}/>
                         <Route path="/contactus" component={ContactUsPage} />
                        <Route path="/admin"
                         component={AdminPage}>
                            {this.state.loggedIn ? 
                            (<Suspense fallback={
                                <div className="page-loading">Loading...</div>
                            }>
                                <AdminPage/>
                            </Suspense>) : 
                            (<Redirect to="/login" />)}
                        </Route>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/products/:id"
                         component={ProductPage} />
                        <Route render={() => (<Redirect to="/products" />)} />
                         </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                    </div>
            )
        }
    }
//     const [loggedIn,setLoggedIn] = React.useState(true)
    
// }

export default RoutesWrap