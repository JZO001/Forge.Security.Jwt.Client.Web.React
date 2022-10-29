# Forge.Security.Jwt.Client.Web.React
About Jwt Token authentication / authorization client side implementation for React apps


## Installing

To install the package run npm package manager:

```
npm install forge-xecurity-jwt-client-web-react --save
```

## Usage

Three components are included into this package:

- AuthorizeView: creates a context for the authentication

Example:

```c#
export default class App extends React.Component<{}> {

	render() {
		return (
			<AuthorizeView>
				<Layout>
					<Routes>
						{AppRoutes.map((route, index) => {
							const { element, ...rest } = route;
							return <Route key={index} {...rest} element={element} />;
						})}
					</Routes>
				</Layout>
			</AuthorizeView>
		)
	}

}
```

In the context, we can use the two additional components:
- Authorized: displays the content, only if the user authenticated
- NotAuthorized: displays the content, only if the user is not authenticated

Example:

```c#
import "./AccountMenu.css";

import React, { Component, Fragment } from "react";
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router';

import LoadingPopup from "./LoadingPopup";
import { UserContext } from "./UserContext";
import { EventArgs } from "jzo-library";
import { ServiceStore } from "forge-security-jwt-client-web";
import { Authorized, NotAuthorized } from "forge-security-jwt-client-web-react";

type AccountMenuState = {
    isErrorPopupVisible: boolean,
    showLoading: boolean,
    isRedirectNeed: boolean
}

class AccountMenu extends Component<{}, AccountMenuState> {

    state = {
        isErrorPopupVisible: false,
        showLoading: false,
        isRedirectNeed: false
    }

    componentDidMount(): void {
        UserContext.instance.onUserChanged.addEventHandler(this.onUserChangedEventHandler);
    }

    componentWillUnmount(): void {
        UserContext.instance.onUserChanged.removeEventHandler(this.onUserChangedEventHandler);
    }

    private onUserChangedEventHandler = (sender: any, e: EventArgs) => {
        this.forceUpdate();
    }

    private logoutClickEventHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        this.setState({ showLoading: true });

        (async () => await ServiceStore.authenticationService.logoutUserAsync())();

        this.setState({ showLoading: false, isRedirectNeed: true });
    }

    private authMenu = () => {
        const name: string = UserContext.instance.currentUser.givenname;
        return (
            <NavItem className="dropdown">
                <NavLink className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" to="#" href="#" title={name}>{name.length > 12 ? name.substring(0, 10) + "..." : name}</NavLink>
                <div className="dropdown-menu accountMenu">
                    <a className="dropdown-item text-dark nav-link" href="#" onClick={(e) => { this.logoutClickEventHandler(e); return false; }}>Sign Out</a>
                </div>
            </NavItem>
        );
    }

    private unAuthMenu = () => {
        return (
            <NavItem>
                <NavLink tag={Link} className="navbar-dark" to={'/login'}>Sign In</NavLink>
            </NavItem>
        );
    }

    render() {
        if (this.state.isRedirectNeed) {
            setTimeout(() => {
                this.setState({ isRedirectNeed: false });
            }, 1);
        }
        return (
            <Fragment>
                <ul className="navbar-nav">
                    <Authorized>
                        {this.authMenu()}
                    </Authorized>
                    <NotAuthorized>
                        {this.unAuthMenu()}
                    </NotAuthorized>
                </ul>
                <LoadingPopup isVisible={this.state.showLoading} />
                {this.state.isRedirectNeed ? <Navigate replace to={'/login'} /> : null}
            </Fragment>
        );
    }

}

export default AccountMenu;
```

For a complete working example, please visit my Forge.Yoda repository: https://github.com/JZO001/Forge.Yoda
The solution conatins a project, called 'Forge.Yoda.Apps.Web.React'. Please feel free to check, how it is configured and used.


Please also check the following projects in my repositories:
- Forge.Yoda
- Forge.Security.Jwt.Service
- Forge.Security.Jwt.Service.Storage.SqlServer
- Forge.Security.Jwt.Client
- Forge.Security.Jwt.Client.Storage.Browser
- Forge.Wasm.BrowserStorages
- Forge.Wasm.BrowserStorages.NewtonSoft.Json
- Forge.Security.Jwt.Client.Web.React
