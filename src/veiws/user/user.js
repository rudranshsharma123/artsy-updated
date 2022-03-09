import React from "react";
import { connect } from "../../redux/DeSo/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "../../navbar/navbar";
import MyCarousel from "./myCarousel";
import "./styles.css";
import Myform from "./myform";
import DesoApi from "../../deso/api/desoApi";
import MyformSolana from "./myFormSolana";

function User(props) {
	const dispatch = useDispatch();
	const deso = useSelector((state) => state.deso);
	const [images, setImages] = useState([]);
	const [onlyImages, setOnlyImages] = useState([]);
	const [body, setBody] = useState("");
	const [loaded, setLoaded] = useState(false);
	console.log(deso);
	useEffect(() => {
		if (deso.publicKey === "" || deso.publicKey === null) {
			dispatch(connect());
		}
	}, []);
	useEffect(() => {
		if (!deso.publicKey) {
		} else {
			getNfts(deso.publicKey);
		}
	}, [deso.publicKey]);

	const getNfts = async (user) => {
		const desoApi = new DesoApi();
		const nfts = await desoApi.getNfts(user);
		console.log(nfts);
		const keys = Object.keys(nfts.NFTsMap);
		console.log(keys);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const nft = nfts.NFTsMap[key];
			const postBody = nft.PostEntryResponse.Body;
			// console.log(postBody);
			const postImage = nft.PostEntryResponse.ImageURLs;
			const poster = nft.PostEntryResponse.ProfileEntryResponse.Username;
			let actualImage = "";
			if (postImage) {
				actualImage = postImage[0];
			}
			console.log(nft, postBody, postImage);
			setOnlyImages((prev) => [...prev, actualImage]);
			setBody(postBody);
			setLoaded(true);
			setImages((prev) => {
				return [
					...prev,
					{
						name: poster,
						title: postBody,
						url: actualImage,
						created_at: "2022-02-20T23:30:01.000Z",
					},
				];
			});
		}
		console.log(images);
	};

	return (
		<div>
			<Navbar isHome={true} />
			<div className="test">
				<div className="form-container">
					<p className="text">Upload more Nfts</p>
					<Myform />
				</div>
				<div className="form-container">
					<p className="text">Upload more Nfts</p>
					<MyformSolana />
				</div>
			</div>

			<div className="carousel-container">
				<div className="user-container">
					<p className="text">Your NFTs</p>
					<MyCarousel images={onlyImages} />
				</div>
				<div className="user-container">
					<p className="text">Your Generated Art</p>
					{loaded ? <MyCarousel images={onlyImages} /> : <p>Loading...</p>}
				</div>
			</div>
		</div>
	);
}

export default User;
