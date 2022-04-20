import { combineReducers } from "redux";

import ownerReducer from "./ownerReducer";

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    owner: ownerReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
