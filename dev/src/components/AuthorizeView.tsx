import { AuthenticationStateChangedEventArgs, ServiceStore } from "forge-security-jwt-client-web";
import * as React from "react";
import { AuthenticationContext } from "./AuthenticationContext";

type AuthorizeViewState = {
    isAuthenticated: boolean
}

export class AuthorizeView extends React.Component<{ children?: JSX.Element }, AuthorizeViewState> {
    static displayName = AuthorizeView.name;

    state = {
        isAuthenticated: ServiceStore.jwtTokenAuthenticationStateProvider.getAuthenticationState().user.identity.isAuthenticated
    }

    componentDidMount(): void {
        ServiceStore.jwtTokenAuthenticationStateProvider.authenticationStateChanged.addEventHandler(this.authenticationStateChangedEventHandler);
    }

    componentWillUnmount(): void {
        ServiceStore.jwtTokenAuthenticationStateProvider.authenticationStateChanged.removeEventHandler(this.authenticationStateChangedEventHandler);
    }

    private authenticationStateChangedEventHandler = (sender: object, e: AuthenticationStateChangedEventArgs) => {
        this.setState({ isAuthenticated: e.state.user.identity.isAuthenticated });
    }

    render() {
        return (
            <AuthenticationContext.Provider value={{
                isAuthenticated: this.state.isAuthenticated
            }}>
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }

}
