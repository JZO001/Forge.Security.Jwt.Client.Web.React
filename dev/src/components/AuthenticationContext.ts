import * as React from "react";
import { AuthenticationContextDelegate } from "./d.ts/AuthenticationContextDelegate";

export type AuthenticationContextData = AuthenticationContextDataExternal & {
    isAuthenticated: boolean;
}

export type AuthenticationContextDataExternal = {
    data: any;
    onChangeContextData?: AuthenticationContextDelegate;
}

export const AuthenticationContext = React.createContext({
    isAuthenticated: false,
    data: null,
    onChangeContextData: (jsonData: AuthenticationContextDataExternal, callback?: () => void) => { }
}) as React.Context<AuthenticationContextData>;
