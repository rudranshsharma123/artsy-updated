import { SolActionTypes } from "./solanaActionTypes";

const initState = {
	loading: false,
	key: null,
	error: null,
	solana: null,
};

const solanaReducer = (state = initState, action) => {
	switch (action.type) {
		case SolActionTypes.LOGIN_REQUEST:
			return {
				...initState,
				loading: true,
			};
		case SolActionTypes.LOGIN_SUCCESS:
			return {
				...initState,
				loading: false,
				key: action.payload.key,
				solana: action.payload.solana,
			};
		case SolActionTypes.LOGIN_FAILURE:
			return {
				...initState,
				loading: false,
			};
		case SolActionTypes.UPDATE_ACCOUNT:
			return {
				...state,
				key: action.payload.publicKey,
			};
		default:
			return state;
	}
};

export default solanaReducer;
