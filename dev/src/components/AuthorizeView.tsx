import { AuthenticationStateChangedEventArgs, ServiceStore } from "forge-security-jwt-client-web";
import * as React from "react";
import { AuthenticationContext, AuthenticationContextDataExternal } from "./AuthenticationContext";

type AuthorizeViewState = {
    isAuthenticated: boolean,
    data: any
}

export class AuthorizeView extends React.Component<{ data?: any, children?: JSX.Element }, AuthorizeViewState> {
    static displayName = AuthorizeView.name;

    state = {
        isAuthenticated: ServiceStore.jwtTokenAuthenticationStateProvider.getAuthenticationState().user.identity.isAuthenticated,
        data: null as any
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

    private changeAuthenticationContextDataExternal = (jsonData: AuthenticationContextDataExternal, callback?: () => void) => {
        this.setState((prevState) => ({ ...jsonData as any, isAuthenticated: prevState.isAuthenticated }), callback);
    }

    render() {
        return (
            <AuthenticationContext.Provider value={{
                isAuthenticated: this.state.isAuthenticated,
                data: this.state.data,
                onChangeContextData: this.changeAuthenticationContextDataExternal
            }}>
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }

}
