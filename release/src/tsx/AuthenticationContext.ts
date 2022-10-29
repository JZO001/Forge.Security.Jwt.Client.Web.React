import * as React from "react";

export type AuthnticationContextData = {
    isAuthenticated: boolean;
}

export const AuthenticationContext = React.createContext({
    isAuthenticated: false
}) as React.Context<AuthnticationContextData>;
