import { Dispatch } from 'redux';


import { LoginAction, OwnerActionType } from "../types/ownerTypes";
import { loginOwner } from '../services/ownerService';

export const login = (username: string, password: string) => async (dispatch: Dispatch<LoginAction>) => {
    try {
        const loginInfo = await loginOwner(username, password);
        dispatch({
            type: OwnerActionType.LOGIN,
            payload: { owner_id: loginInfo.owner_id, token: loginInfo.token }
        });
        return true;
    } catch (error) {
        return false;
    }
};

