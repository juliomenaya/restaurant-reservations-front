import { AxiosResponse } from "axios";
import { api } from ".";
import { ILoginInfo } from "../types/ownerTypes";


export const loginOwner = async (username: string, password: string) => {
    const response: AxiosResponse = await api.post('owners/login/', { username, password });
    const loginInfo: ILoginInfo = response.data;
    return loginInfo;
};
