import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
function Pin({ pinSize, image }) {
	return (
		<div className={`pin ${pinSize}`}>
			<img src={image} style={{ width: "100%" }} />
			<Button variant="danger"> hello</Button>
		</div>
	);
}

export default Pin;
