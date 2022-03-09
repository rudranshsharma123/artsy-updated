import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import desoReducer from "./DeSo/reducer";
import solanaReducer from "./Solana/reducer";

const rootReducer = combineReducers({
	deso: desoReducer,
	solana: solanaReducer,
});

const midlleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
	return createStore(
		rootReducer,
		/* preloadedState, */ composeEnhancers(applyMiddleware(...midlleware)),
	);
};

const store = configureStore();

export default store;
