import { SET_BUSINESS_OVERVIEW_OPTION } from './actionTypes';

const initialState = {
  selectedOption: {},
};

const businessMiscReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUSINESS_OVERVIEW_OPTION:
      return {
        ...state,
        selectedOption: action.payload,
      };
    default:
      return state;
  }
};

export const getSelectedOptionState = (state) => state.businessMisc.selectedOption;

export default businessMiscReducer;
