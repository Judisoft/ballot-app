// Define your initial state
const initialState = {
  groupName: "",
};

const SET_GROUP_NAME = "SET_GROUP_NAME";

const setGroupName = (name) => ({
  type: SET_GROUP_NAME,
  payload: name,
});

// Define your reducer function
const groupNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUP_NAME:
      return {
        ...state,
        groupName: action.payload,
      };
    default:
      return state;
  }
};

export { groupNameReducer, setGroupName };
