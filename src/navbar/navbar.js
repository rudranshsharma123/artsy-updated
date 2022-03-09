import React, { useEffect } from "react";
import "./styles.css";
import { connect } from "../redux/DeSo/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Navbar({ isHome }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const deso = useSelector((state) => state.deso);
	console.log(deso);
	useEffect(() => {
		if (deso.publicKey === "" || deso.publicKey === null) {
			dispatch(connect());
		}
	}, []);
	const handlePageChange = () => {
		if (isHome) {
			navigate("/");
			return;
		}
		navigate("/user");
	};

	const handleLogout = () => {
		navigate("/gen");
	};
	const handleChange = () => {
		navigate("/discover");
	};
	return (
		<nav id="nav">
			<div id="nav-links">Artsy</div>

			<div>
				<Button
					variant="none"
					style={{ color: "white", fontSize: "30px" }}
					onClick={handlePageChange}>
					{isHome ? "Home" : "Profile"}
				</Button>
				<Button
					variant="none"
					style={{ color: "white", fontSize: "30px" }}
					onClick={handleLogout}>
					ArtGen
				</Button>
				<Button
					variant="none"
					style={{ color: "white", fontSize: "30px" }}
					onClick={handleChange}>
					Discover
				</Button>
			</div>
		</nav>
	);
}

export default Navbar;
