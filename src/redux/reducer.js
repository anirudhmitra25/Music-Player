import { combineReducers } from "redux";

const saveaccessToken = (state = null, action) => {
    if (action.type === "SET_ACCESS_TOKEN") {
        if(action.payload!==null){
        localStorage.setItem('token',action.payload);
        }
      return action.payload;
    } else {
      return state;
    }
  };

const reducer=combineReducers({
    accessToken: saveaccessToken
});

export default reducer;