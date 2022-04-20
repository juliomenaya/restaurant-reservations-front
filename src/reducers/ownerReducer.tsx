
import { OwnerAction, OwnerState, ILoginInfo, OwnerActionType } from "../types/ownerTypes";


const initialState: OwnerState = {
    ownerId: null,
    token: ''
};

const ownerReducer = (state: OwnerState = initialState, action: OwnerAction): OwnerState => {
    switch (action.type) {
        case OwnerActionType.LOGIN:
            const loginData: ILoginInfo = { ...action.payload };
            return {
                ownerId: loginData.owner_id,
                token: loginData.token
            };
        default:
            return state;
    }
};


export default ownerReducer;
