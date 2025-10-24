import axios from "axios";
import {UserProfileToken} from "../../types/Types";
import {handleError} from "./ErrorHandler";

const api = "http://localhost:5201/api/";

export const loginAPI = async (email: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/login", {
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const registerAPI = async (
    email: string,
    password: string,
    role: string[]
) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            email: email,
            password: password,
            role: role,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const resetPasswordAPI = async (email: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/reset-password", {
            email: email,
            newPassword: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}