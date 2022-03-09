import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "../../redux/DeSo/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastySuccess, toastyFailure } from "../../consts/toasts";
import { connectToSolana } from "../../redux/Solana/actions";
import axios from "axios";

function MyformSolana(props) {
	const dispatch = useDispatch();
	const [link, setLink] = useState("");
	const [name, setname] = useState("");
	const [symbol, setsymbol] = useState("");
	const [desc, setdesc] = useState("");
	const solana = useSelector((state) => state.solana);
	const solanaKey = useSelector((state) => state.solana.key);
	useEffect(() => {
		if (solanaKey == "" || solanaKey == null) {
			toastySuccess("Connecting to Solana for you");
			dispatch(connectToSolana());
			console.log(solana);
			toastyFailure(
				"If you dont see a success message check your phantom wallet",
			);
		} else {
			toastySuccess(`We are now live on Solana! ${solana.key}`);
		}
	}, [solanaKey]);
	function onChangeTextFeild(event, name) {
		switch (name) {
			case "name":
				setname(event.target.value);
				break;

			case "link":
				setLink(event.target.value);
				break;

			case "symbol":
				setsymbol(event.target.value);
				break;

			case "desc":
				setdesc(event.target.value);
				break;

			default:
				break;

			// setProjectName(event.target.value);
		}
	}

	const makeNftSolana = async () => {
		const res = await axios({
			method: "post",
			url: "http://localhost:3001/mint",
			data: {
				pubKey: solana.key,
				img: link,
				name,
				symbol,
				desc,
			},
		}).then((rest) => {
			console.log(rest);
		});
	};

	return (
		<Form>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Link To Your NFT's Image</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter link to you NFT's image"
					value={link}
					onChange={(e) => {
						onChangeTextFeild(e, "link");
						console.log(link);
					}}
				/>
				<Form.Text className="text-muted">
					You should have a link to your NFT's image.
				</Form.Text>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Enter SymBol for your NFTs</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter Symbol for your NFTs"
					value={symbol}
					onChange={(e) => {
						onChangeTextFeild(e, "symbol");
						console.log(symbol);
					}}
				/>
				<Form.Text className="text-muted">
					You should set a Symbol for your NFTs
				</Form.Text>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Enter The name of you Nfts</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter name of your NFT's"
					value={name}
					onChange={(e) => {
						onChangeTextFeild(e, "name");
						console.log(name);
					}}
				/>
				<Form.Text className="text-muted">
					You should provide Name for the NFT's metadata
				</Form.Text>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Enter the Desc for your NFTs</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter the Description of your NFTs"
					value={desc}
					onChange={(e) => {
						onChangeTextFeild(e, "desc");
						console.log(desc);
					}}
				/>
				<Form.Text className="text-muted">You should set the desc</Form.Text>
			</Form.Group>
			<Button
				variant="primary"
				type="submit"
				onClick={(e) => {
					e.preventDefault();
					dispatch(connectToSolana());
				}}>
				Connect to Solana
			</Button>
			<Button
				variant="primary"
				onClick={async (e) => {
					e.preventDefault();
					await makeNftSolana();
					// await createPostForNft();
					// makePostNft(deso.publicKey);
					toastySuccess("NFT Minted, check your wallet");
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
	);
}

export default MyformSolana;
