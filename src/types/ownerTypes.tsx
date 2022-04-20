export type OwnerState = {
    ownerId: number | null,
    token?: string
};


export enum OwnerActionType {
    LOGIN = 'LOGIN'
};

export interface ILoginInfo {
    token: string,
    owner_id: number
};

export type LoginAction = {
    type: OwnerActionType.LOGIN,
    payload: ILoginInfo
};


export type OwnerAction = LoginAction;
