import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  GET_ACCOUNTS,
  ACCOUNTS_LOADING,
  SAVE_BILL,
  GET_BILLS,
} from "../actions/types";

const initialState = {
  accounts: [],
  accountsLoading: false,
  billItems: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACCOUNTS_LOADING:
      return {
        ...state,
        accountsLoading: true,
      };
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [action.payload, ...state.accounts],
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          (account) => account._id !== action.payload
        ),
      };
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
        accountsLoading: false,
      };
    case GET_BILLS:
      return {
        ...state,
        billItems: action.payload,
        accountsLoading: false,
      };
    case SAVE_BILL:
      return {
        ...state,
        billItems: action.payload,
      };
    default:
      return state;
  }
}
