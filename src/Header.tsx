import * as React from "react"
import {NavLink,RouteComponentProps,withRouter} from "react-router-dom"
import "url-search-params-polyfill"
import logo from "./logo.svg"

const Header:React.SFC<RouteComponentProps> = (props) => {

    const [search,setSearch] = React.useState("")
    React.useEffect(() => {
        const searchParams = new
        URLSearchParams(props.location.search);
        setSearch(searchParams.get("search") || "");
        }, []);

        const handleSearchChange = (e:
            React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.currentTarget.value);
        };

        const handleSearchKeydown = (e:
            React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                props.history.push(`/products?search=${search}`);
            }
        };
    return(
        <header className="header">
            <div className="search-container">
                <input type="search" placeholder="search"
                 value={search} onChange={handleSearchChange}
                onKeyDown={handleSearchKeydown}/>
            </div>
        <img src={logo} className="header-logo" alt="logo" />
        <h1 className="header-title">React Shop</h1>
        <nav>
            <NavLink to="/products" activeClassName="header-link-active" className="headerlink">
            Products</NavLink>
            <NavLink to="/admin" activeClassName="header-link-active" className="header-link">Admin</NavLink>
            <NavLink to="/contactus" activeClassName="header-link-active" className="header-link">Contact Us</NavLink>
        </nav>
        </header>
    )
}

export default withRouter(Header)