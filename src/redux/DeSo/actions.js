import { ActionTypes } from "./actionTypes";
import DesoIdentity from "../../deso/identity/desoIdentity";
import DesoApi from "../../deso/api/desoApi";
const IdentityUsersKey = "identityUsersV2";
const connectionRequest = () => {
	return {
		type: ActionTypes.LOGIN_REQUEST,
	};
};

const connectSuccess = (payload) => {
	return {
		type: ActionTypes.LOGIN_SUCCESS,
		payload: payload,
	};
};

const connectFailure = (payload) => {
	return {
		type: ActionTypes.LOGIN_FAILURE,
		payload: payload,
	};
};

const updateAccount = (payload) => {
	return {
		type: ActionTypes.UPDATE_ACCOUNT,
		payload: payload,
	};
};

const addUser = (payload) => {
	return {
		type: ActionTypes.ADD_USER,
		payload: payload,
	};
};

const logout = () => {
	return {
		type: ActionTypes.LOGOUT_REQUEST,
	};
};

// @TODO , Add the local storage thing in its own function and get that thign working

export const connect = () => {
	return async (dispatch) => {
		dispatch(connectionRequest());
		const desoIdentity = new DesoIdentity();
		const desoApi = new DesoApi();

		let isUser = false;
		let publicKey = null;
		let currentUser = null;
		if (localStorage.getItem("users")) {
			const temp = JSON.parse(localStorage.getItem("users"));
			dispatch(addUser(temp));
		}
		console.log(localStorage.getItem(IdentityUsersKey));
		if (localStorage.getItem(IdentityUsersKey) === "undefined") {
			currentUser = {};
		} else if (localStorage.getItem(IdentityUsersKey)) {
			currentUser = JSON.parse(localStorage.getItem(IdentityUsersKey) || "{}");
		}
		publicKey = currentUser.publicKey;
		// if (currentUser.publicKey) {
		// 	isUser = true;
		// 	publicKey = currentUser.publicKey;
		// 	dispatch(updateAccount(currentUser.publicKey));
		// 	dispatch(addUser(currentUser));
		// 	// localStorage.setItem("users", JSON.stringify(allUsers));
		// }
		if (currentUser && publicKey) {
			dispatch(connectSuccess({ desoApi, desoIdentity, publicKey }));
		}
		// if (publicKey === null) {
		// 	const currentUser = await desoIdentity.loginAsync("4");
		// 	publicKey = currentUser.publicKey;
		// 	dispatch(addUser(currentUser));
		// }
	};
};

export const login = () => {
	return async (dispatch) => {
		const desoApi = new DesoApi();
		const desoIdentity = new DesoIdentity();
		const currentUser = await desoIdentity.loginAsync("4");
		console.log(currentUser);
		const publicKey = currentUser.publicKey;
		console.log(publicKey);
		dispatch(connectSuccess({ desoApi, desoIdentity, publicKey }));
	};
};

const logOutOftheApp = async (publicKey) => {
	const desoIdentity = new DesoIdentity();
	const res = await desoIdentity.logout(publicKey);
	return async (dispatch) => {
		dispatch(logout());
	};
};
