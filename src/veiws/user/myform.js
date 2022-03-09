import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "../../redux/DeSo/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastySuccess } from "../../consts/toasts";
function Myform(props) {
	const dispatch = useDispatch();
	const deso = useSelector((state) => state.deso);
	const [link, setLink] = useState("");
	const [body, setBody] = useState("");
	const [sellPrice, setSellPrice] = useState(0);
	const [isForSale, setIsForSale] = useState(true);
	const [amountToBeSold, setAmountToBeSold] = useState(0);
	console.log(deso);
	const createPostForNft = async () => {
		const desoApi = deso.desoApi;
		const desoIdentity = deso.desoIdentity;
		const res = await desoApi.createPostForNfts(deso.publicKey, body, [link]);
		console.log(res);
		const txnHex = res.TransactionHex;
		console.log(txnHex);
		console.log(desoIdentity);
		const signTxnHex = await desoIdentity.signTxAsync(txnHex);
		const finalSub = await desoApi.submitTransaction(signTxnHex);
		console.log(finalSub);
	};

	const makePostNft = async (publicKey) => {
		const desoApi = deso.desoApi;
		const desoIdentity = deso.desoIdentity;
		const getPostForAPublicKey = await desoApi.getPostsForPublicKey(
			"",
			publicKey,
			"",
		);
		console.log(getPostForAPublicKey);
		const lastPostHex = getPostForAPublicKey.Posts[0].PostHashHex;
		const hext = await desoApi.createNftTxn(
			publicKey,
			lastPostHex,
			parseInt(amountToBeSold),
			0,
			0,
			false,
			isForSale,
			sellPrice,
		);
		console.log(hext);
		const hex = hext.TransactionHex;
		const signTxnHex = await desoIdentity.signTxAsync(hex);
		console.log("here");

		const sub = await desoApi.submitTransaction(signTxnHex);
		console.log("here");
		console.log(sub);
		console.log("here");
	};

	useEffect(() => {
		if (deso.publicKey === "" || deso.publicKey === null) {
			dispatch(connect());
		}
	}, []);
	function onChangeTextFeild(event, name) {
		switch (name) {
			case "body":
				setBody(event.target.value);
				break;
			case "number":
				setAmountToBeSold(event.target.value);
				break;

			case "link":
				setLink(event.target.value);
				break;

			case "sellPrice":
				setSellPrice(event.target.value);
				break;

			case "isForSale":
				setIsForSale(event.target.value);
				break;

			default:
				break;

			// setProjectName(event.target.value);
		}
	}

	const switchI = () => {
		setIsForSale(!isForSale);
		console.log(isForSale);
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
				<Form.Label>Enter price at which you want to sell your NFTs</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter selling price for your NFTs"
					value={sellPrice}
					onChange={(e) => {
						onChangeTextFeild(e, "sellPrice");
						console.log(sellPrice);
					}}
				/>
				<Form.Text className="text-muted">
					You should set a price for your NFTs
				</Form.Text>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Enter The Body of you Nfts</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter body of your NFT's"
					value={body}
					onChange={(e) => {
						onChangeTextFeild(e, "body");
						console.log(body);
					}}
				/>
				<Form.Text className="text-muted">
					You should provide a textual desciption for the NFT's metadata
				</Form.Text>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Text>Is your NFT for Sale?</Form.Text>
				<Form.Switch onChange={switchI} checked={isForSale}></Form.Switch>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Enter number of NFTs you want to sell</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter the number of NFTs you want to sell"
					value={amountToBeSold}
					onChange={(e) => {
						onChangeTextFeild(e, "number");
						console.log(amountToBeSold);
					}}
				/>
				<Form.Text className="text-muted">
					You should set the number of NFTs you want default is 2
				</Form.Text>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
			<Button
				variant="primary"
				onClick={async (e) => {
					e.preventDefault();
					await createPostForNft();
					makePostNft(deso.publicKey);
					toastySuccess("NFTs are now for sale");
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

export default Myform;
