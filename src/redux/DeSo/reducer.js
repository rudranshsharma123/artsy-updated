import { ActionTypes } from "./actionTypes";

const initState = {
	loading: false,
	publicKey: null,
	error: null,
	desoApi: null,
	desoIdentity: null,
	users: [],
};

const desoReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.LOGIN_REQUEST:
			return {
				...initState,
				loading: true,
			};
		case ActionTypes.LOGIN_SUCCESS:
			return {
				...initState,
				loading: false,
				publicKey: action.payload.publicKey,
				desoApi: action.payload.desoApi,
				desoIdentity: action.payload.desoIdentity,
			};
		case ActionTypes.LOGIN_FAILURE:
			return {
				...initState,
				loading: false,
			};
		case ActionTypes.UPDATE_ACCOUNT:
			return {
				...state,
				publicKey: action.payload.publicKey,
			};
		case ActionTypes.ADD_USER:
			return {
				...state,
				users: [...state.users, action.payload],
			};
		case ActionTypes.LOGOUT_REQUEST:
			return {
				...state,
				publicKey: null,
			};
		default:
			return state;
	}
};

export default desoReducer;
