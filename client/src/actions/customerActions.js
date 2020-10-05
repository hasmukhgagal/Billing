import axios from "axios";
import {
  GET_ERRORS,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  GET_ACCOUNTS,
  ACCOUNTS_LOADING,
  SAVE_BILL,
  GET_BILLS,
} from "./types";

// Add customer
export const addCustomer = (userData) => (dispatch) => {
  console.log("#", userData);
  axios
    .post("/api/accounts/account/add", userData)
    .then((res) => {
      dispatch({
        type: ADD_ACCOUNT,
        payload: res.data,
      });
      dispatch({
        type: "MESSAGE",
        payload: "Account Added Successfuly!",
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete account
export const deleteAccount = (userData) => (dispatch) => {
  const id = userData.id;
  axios
    .delete(`/api/accounts/account/${id}`)
    .then(
      (res) =>
        dispatch({
          type: DELETE_ACCOUNT,
          payload: id,
        }),
      dispatch({
        type: "MESSAGE",
        payload: "Account Deleted Successfuly!",
      })
    )
    .then()
    .catch((err) => console.log(err));
};

// Get all accounts for specific user
export const getAccounts = () => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .get("/api/accounts/account")
    .then((res) =>
      dispatch({
        type: GET_ACCOUNTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ACCOUNTS,
        payload: null,
      })
    );
};

// Get all Bills for specific user
export const getBills = (id) => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .get(`/api/accounts/account/${id}/bills`)
    .then((res) => {
      dispatch({
        type: GET_BILLS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ACCOUNTS,
        payload: null,
      })
    );
};

// Add Bills
export const saveBill = (billData) => (dispatch) => {
  const id = billData.customerId;
  axios
    .post(`/api/accounts/account/${id}/bills`, billData)
    .then((res) => {
      dispatch({
        type: SAVE_BILL,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Accounts loading
export const setAccountsLoading = () => {
  return {
    type: ACCOUNTS_LOADING,
  };
};
