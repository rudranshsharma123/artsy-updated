import React from "react";
import Navbar from "../../navbar/navbar";
import DifForm from "./difForm";
import "./styles.css";

function ArtGen(props) {
	return (
		<div>
			<Navbar />
			<div className="form-container">
				<DifForm />
			</div>
		</div>
	);
}

export default ArtGen;
