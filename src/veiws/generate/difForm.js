import axios from "axios";
import React, { useState } from "react";
import {
	Form,
	Button,
	FormControl,
	FormGroup,
	FormLabel,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Buffer } from "buffer";
import { toastySuccess } from "../../consts/toasts";
import "./styles.css";

function DifForm(props) {
	const [email, setEmail] = useState("");
	const [prompt, setPrompt] = useState("");
	const [style, setStyle] = useState("");
	const [image, setImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	function onChangeTextFeild(event, name) {
		switch (name) {
			case "email":
				setEmail(event.target.value);
				break;
			case "prompt":
				setPrompt(event.target.value);
				break;

			case "style":
				setStyle(event.target.value);
				break;

			default:
				break;

			// setProjectName(event.target.value);
		}
	}

	const makeArt = async () => {
		const res = await axios({
			method: "post",
			url: "http://8208-35-196-0-137.ngrok.io/generate",
			responseType: "arraybuffer",
			data: {
				iterations: 10,
				prompts: prompt,
				style: style,
			},
		}).then((res) => {
			console.log(res);
			const blob = new Blob([res.data]);
			const url = URL.createObjectURL(blob);
			const base64String = Buffer(res.data).toString("base64");
			console.log(base64String);
			console.log(url);
			return { url, base64String };
		});
		setImage(res.url);
		const formData = new FormData();
		formData.append("key", "30ceb57534a7fb760bb72e9b638a5d67");

		formData.append("image", res.base64String);
		console.log(formData);
		let body = { key: "30ceb57534a7fb760bb72e9b638a5d67", image: res };

		const res2 = await axios({
			method: "post",
			url: "https://api.imgbb.com/1/upload",
			withCredentials: false,
			data: formData,
		}).then((res) => {
			return res.data.data.url;
		});
		setImageUrl(res2);
		toastySuccess(
			"Your Image url is " + res2 + "use it to mint your NFT if you like",
		);
	};

	return (
		<div className="main-container">
			<Form className="form">
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Your Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter Your Email to get your art "
						value={email}
						onChange={(e) => {
							onChangeTextFeild(e, "email");
							console.log(email);
						}}
					/>
					<Form.Text className="text-muted">
						You should have a link to your NFT's image.
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>
						Enter the prompt from whihc you want to gen art from
					</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter the prompt from which you want to gen art from"
						value={prompt}
						onChange={(e) => {
							onChangeTextFeild(e, "prompt");
							console.log(prompt);
						}}
					/>
					<Form.Text className="text-muted">
						You can provide a text input of what image you want
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Please enter the art you want to see</Form.Label>
					<Form.Control
						type="email"
						placeholder="Please enter the kind of art you want to see"
						value={style}
						onChange={(e) => {
							onChangeTextFeild(e, "style");
							console.log(style);
						}}
					/>
					<Form.Text className="text-muted">
						You can only choose from Painting, Pixel Art
					</Form.Text>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
				<Button
					variant="primary"
					onClick={async (e) => {
						e.preventDefault();
						makeArt();
					}}>
					Submit
				</Button>{" "}
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
			</Form>
			<img src={image} style={{ width: "100%" }} className="img" />
		</div>
	);
}

export default DifForm;
