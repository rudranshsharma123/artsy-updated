import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./veiws/login/login";
import Discover from "./veiws/discover/discover";
import User from "./veiws/user/user";
import store from "./redux/store";
import { Provider } from "react-redux";
import ArtGen from "./veiws/generate/artGen";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/discover" element={<Discover />} />
				<Route path="/user" element={<User />} />
				<Route path="/gen" element={<ArtGen />} />
			</Routes>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
