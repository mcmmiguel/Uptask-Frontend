import { isAxiosError } from "axios";
import { UserRegistrationForm } from "../types";
import api from "@/lib/axios";


export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = 'http://localhost:4000/api/auth/create-account';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}