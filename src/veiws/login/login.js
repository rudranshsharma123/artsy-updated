import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect, login } from "../../redux/DeSo/actions";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastySuccess } from "../../consts/toasts";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";

import { connectToSolana } from "../../redux/Solana/actions";
// import { handleNavigate } from "../../consts/helper";

function Login(props) {
	const dispatch = useDispatch();
	const deso = useSelector((state) => state.deso);
	const solana = useSelector((state) => state.solana);
	const solanaKey = useSelector((state) => state.solana.key);
	const [publicKey, setPublic] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (deso.publicKey === "" || deso.publicKey === null) {
			dispatch(connect());
		}
	}, []);

	useEffect(() => {
		if (!solanaKey) {
			// dispatch(connectToSolana(solanaKey));
			toastySuccess(
				"You are not connected to Solana click connect to proceed ",
			);
		} else {
			toastySuccess(`You are connected to Solana ${solanaKey}`);
		}
	}, [solanaKey]);

	useEffect(() => {
		if (deso.publicKey) {
			setPublic(deso.publicKey);
			toastySuccess(
				"You already have an DeSo account " +
					"look at the footer for more details ",
			);
		}
	}, [deso.publicKey]);

	const handlePageChange = () => {
		navigate("/discover");
	};

	return (
		<div>
			<div id="heading-container">
				<p id="heading">
					Welcome to the <span id="text">Artsy</span>
				</p>

				<div id="button-container">
					<button
						onClick={(e) => {
							e.preventDefault();
							// dispatch(connect());
							dispatch(connectToSolana());
							console.log(solanaKey);
						}}
						id="button">
						<p id="login-text">Login w/Solana</p>
					</button>
					<button
						id="button"
						onClick={(e) => {
							e.preventDefault();
							dispatch(login());
						}}>
						<p id="login-text">Connect w/DeSo</p>
					</button>
				</div>
			</div>

			<iframe
				title="desoidentity"
				id="identity"
				frameBorder="0"
				src="https://identity.deso.org/embed?v=2"
				style={{
					height: "100vh",
					width: "100vw",
					display: "none",
					position: "fixed",
					zIndex: 1000,
					left: 0,
					top: 0,
				}}></iframe>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<footer id="footer">
				{" "}
				{publicKey && (
					<div>
						Hello, you are logged in{" "}
						<button onClick={handlePageChange}>click me</button> to procceed{" "}
						<div style={{ margin: "10px", padding: "10px" }}>
							This is your DeSo publicKey <span id="text">{publicKey} </span>
							<br></br>
							<p>If this is not your account click on login again!</p>
						</div>
					</div>
				)}
			</footer>
		</div>
	);
}

export default Login;
