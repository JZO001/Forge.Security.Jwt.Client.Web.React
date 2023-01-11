import { AuthenticationContextDataExternal } from "../AuthenticationContext";

export interface AuthenticationContextDelegate extends Function {
    (data: AuthenticationContextDataExternal, callback?: () => void): void;
}
