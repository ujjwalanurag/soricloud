import { combineReducers } from "redux";

import modalReducer from "./ui/modal_reducer";
import loginInputReducer from "./ui/login_input_reducer";
import loginTypeReducer from "./ui/login_type_reducer";
import currentTrackReducer from "./ui/current_track_reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  loginInput: loginInputReducer,
  loginType: loginTypeReducer,
  currentTrack: currentTrackReducer,
  
});

export default uiReducer;
