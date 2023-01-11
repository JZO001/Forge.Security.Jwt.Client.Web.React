import * as React from "react";
import { AuthenticationContext, AuthenticationContextData } from "./AuthenticationContext";

export class NotAuthorized extends React.Component<{ children?: JSX.Element }> {
    static displayName = NotAuthorized.name;

    render() {
        return (
            <AuthenticationContext.Consumer>
                {
                    (authContext: AuthenticationContextData) => <NotAuthorizedInternal authContext={authContext} {...this.props} />
                }
            </AuthenticationContext.Consumer>
        );
    }

}

type NotAuthorizedInternalProps = {
    children?: JSX.Element;
    authContext: AuthenticationContextData;
}

class NotAuthorizedInternal extends React.Component<NotAuthorizedInternalProps> {
    static displayName = NotAuthorizedInternal.name;

    render() {
        return this.props.authContext.isAuthenticated ? null : this.props.children;
    }

}
