import { SolActionTypes } from "./solanaActionTypes";

const connectionRequest = () => {
	return {
		type: SolActionTypes.LOGIN_REQUEST,
	};
};

const connectionSuccess = (payload) => {
	return {
		type: SolActionTypes.LOGIN_SUCCESS,
		payload,
	};
};
const connectionFailure = (payload) => {
	return {
		type: SolActionTypes.LOGIN_FAILURE,
		payload,
	};
};
const updateAccount = (payload) => {
	return {
		type: SolActionTypes.UPDATE_ACCOUNT,
		payload,
	};
};

export const connectToSolana = () => {
	return async (dispatch) => {
		dispatch(connectionRequest());
		const { solana } = window;
		if (solana && solana.isPhantom) {
			console.log("Phanton is found and everything is a ok");
			const res = await solana.connect({ onlyIfTrusted: true });
			console.log("Conected with Public Key", res.publicKey.toString());
			dispatch(connectionSuccess({ key: res.publicKey.toString(), solana }));
		}
		// window.solana.on("accountsChanged", (accounts) => {
		// 	dispatch(updateAccount(accounts[0]));
		// });
	};
};
