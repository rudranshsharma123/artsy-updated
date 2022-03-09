import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../navbar/navbar";
import { connect } from "../../redux/DeSo/actions";
import { connectToSolana } from "../../redux/Solana/actions";
import { toastySuccess, toastyFailure } from "../../consts/toasts";

import Pin from "./pin";
import "./styles.css";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import DesoApi from "../../deso/api/desoApi";
import TPin from "./testingpin";
import axios from "axios";

function Discover(props) {
	const dispatch = useDispatch();
	const deso = useSelector((state) => state.deso);
	const solana = useSelector((state) => state.solana);
	const solanaKey = useSelector((state) => state.solana.key);
	const [solanaImages, setSolanaImages] = useState([]);
	const [images, setImages] = useState([{}]);
	const [isSol, setIsSol] = useState(false);
	// console.log(deso);
	useEffect(() => {
		if (deso.publicKey === "" || deso.publicKey === null) {
			dispatch(connect());
		}
	}, []);

	useEffect(() => {
		if (isSol) {
			if (solanaKey == "" || solanaKey == null) {
				toastySuccess("Connecting to Solana for you");
				dispatch(connectToSolana());
				console.log(solana);
				toastyFailure(
					"If you dont see a success message check your phantom wallet",
				);
			} else {
				toastySuccess(`We are now live on Solana! ${solana.key}`);
				if (solanaImages.length <= 1) {
					getNFTSol(solana.key);
				}
			}
		}
	}, [isSol, solanaKey]);
	const changeChains = () => {
		setIsSol(!isSol);
	};
	// console.log(deso);
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

	const test = async () => {
		// console.log(x.data);
	};

	const getNFTSol = async (user) => {
		const url = "http://localhost:3001/nft";
		const res = await axios({
			method: "post",
			url,
			data: {
				pubKey: user,
			},

			headers: {
				"Access-Control-Allow-Credentials": true,
			},
		}).then((res) => {
			return res.data;
		});
		console.log(res);
		for (let i in res) {
			const name = res[i]["data"]["name"];
			const url = res[i]["data"]["uri"];
			const sym = res[i]["data"]["symbol"];
			const x = await axios.get(url);
			// console.log();
			setSolanaImages((prev) => {
				return [
					...prev,
					{
						name: name,
						title: sym,
						url: x["data"]["image"],
						created_at: "2022-02-20T23:30:01.000Z",
					},
				];
			});
			console.log();
		}
	};

	useEffect(() => {
		console.log(deso.publicKey, images);
		if (deso.publicKey != null && images.length === 1) {
			getNfts(deso.publicKey);
		}
	}, [deso.publicKey]);
	const arr = ["small", "medium", "large"];
	return (
		<>
			<Navbar />
			<div>
				<Button id="button" onClick={changeChains}>
					Change Chains {isSol ? "Switch To DeSo" : "Switch to Solana"}
				</Button>
			</div>
			{/* <div>
				<Button
					id="button"
					onClick={() => {
						getNFTSol(solanaKey);
					}}>
					Change Chains {isSol ? "Switch To DeSo" : "Switch to Solana"}
				</Button>
			</div>
			<div>
				<Button
					id="button"
					onClick={() => {
						test();
					}}>
					Change Chains {isSol ? "Switch To DeSo" : "Switch to Solana"}
				</Button>
			</div> */}
			<div className="mainContainer">
				{!isSol &&
					images &&
					images.map((data, key) => (
						<TPin
							key={data.id}
							pinSize={arr[key % 3]}
							imgSrc={data.url}
							name={data.title}
							link={data}
						/>
					))}
			</div>
			<div className="mainContainer">
				{isSol &&
					solanaImages &&
					solanaImages.map(
						(data, key) => (
							console.log(data),
							(
								<TPin
									key={data.id}
									pinSize={arr[key % 3]}
									imgSrc={data.url}
									name={data.name}
									link={data}
								/>
							)
						),
					)}
			</div>

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
		</>
	);
}

export default Discover;

{
	/* <Pin pinSize="small" image={images[0]} />
				<Pin pinSize="medium" image={images[1]} />
				<Pin pinSize="large" image={images[6]} />
				<Pin pinSize="large" image={images[0]} />
				<Pin pinSize="small" image={images[0]} />
				<Pin pinSize="small" image={images[0]} /> */
}

const Data = [
	{
		id: 1,
		imgSrc:
			"https://cdn.pixabay.com/photo/2021/12/01/17/28/branch-6838719_960_720.jpg",
		name: "Vladvictoria",
		link: "https://pixabay.com/photos/branch-ornaments-lights-tree-6838719/",
		size: "small",
	},
	{
		id: 2,
		imgSrc:
			"https://cdn.pixabay.com/photo/2021/12/05/21/39/christmas-balls-6848782_960_720.jpg",
		name: "Mammiya",
		link: "https://pixabay.com/photos/christmas-balls-christmas-advent-6848782/",
		size: "medium",
	},
	{
		id: 3,
		imgSrc:
			"https://cdn.pixabay.com/photo/2020/07/29/03/58/child-5446839_960_720.jpg",
		name: "Zhangliams",
		link: "https://pixabay.com/photos/child-boy-run-alley-street-plants-5446839/",
		size: "large",
	},
	{
		id: 4,
		imgSrc:
			"https://cdn.pixabay.com/photo/2016/11/14/09/14/cat-1822979_960_720.jpg",
		name: "Mshyun",
		link: "https://pixabay.com/photos/cat-christmas-tree-ornaments-1822979/",
		size: "medium",
	},
	{
		id: 5,
		imgSrc:
			"https://cdn.pixabay.com/photo/2021/11/02/10/46/lemur-6762935_960_720.jpg",
		name: "Jansheldan",
		link: "https://pixabay.com/photos/lemur-animal-wilderness-nature-6762935/",
		size: "large",
	},
	{
		id: 6,
		imgSrc:
			"https://cdn.pixabay.com/photo/2021/10/13/07/43/couple-6705694_960_720.jpg",
		name: "Jupilu",
		link: "https://pixabay.com/photos/couple-sundown-field-sunset-6705694/",
		size: "small",
	},
	{
		id: 7,
		imgSrc:
			"https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_960_720.jpg",
		name: "Stergo",
		link: "https://pixabay.com/photos/fantasy-butterflies-mushrooms-2049567/",
		size: "medium",
	},
	{
		id: 8,
		imgSrc:
			"https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_960_720.jpg",
		name: "Homecare",
		link: "https://pixabay.com/photos/bird-fluttering-berries-wings-tit-1045954/",
		size: "large",
	},
	{
		id: 9,
		imgSrc:
			"https://cdn.pixabay.com/photo/2021/11/26/20/44/lantern-6826687_960_720.jpg",
		name: "Lasrs Nissen",
		link: "https://pixabay.com/photos/lantern-sea-sky-beach-water-6826687/",
		size: "medium",
	},
	{
		id: 10,
		imgSrc:
			"https://cdn.pixabay.com/photo/2021/11/30/17/06/tree-6835828_960_720.jpg",
		name: "Jell Wllington",
		link: "https://pixabay.com/photos/tree-snow-winter-christmas-branch-6835828/",
		size: "medium",
	},
	{
		id: 11,
		imgSrc:
			"https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267_960_720.jpg",
		name: "Chraecker",
		link: "https://pixabay.com/photos/owl-bird-animal-bird-of-prey-50267/",
		size: "small",
	},
	{
		id: 12,
		imgSrc:
			"https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg",
		name: "Comfreak",
		link: "https://pixabay.com/photos/elephant-watering-hole-baby-elephant-2380009/",
		size: "medium",
	},
	{
		id: 13,
		imgSrc:
			"https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_960_720.jpg",
		name: "Sasinet",
		link: "https://pixabay.com/photos/woman-kid-rain-leaf-umbrella-1807533/",
		size: "large",
	},
	{
		id: 14,
		imgSrc:
			"https://cdn.pixabay.com/photo/2019/08/19/07/45/dog-4415649_960_720.jpg",
		name: "Hauad",
		link: "https://pixabay.com/photos/dog-corgi-pets-cute-rain-4415649/",
		size: "medium",
	},
	{
		id: 15,
		imgSrc:
			"https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014619_960_720.jpg",
		name: "Chau min",
		link: "https://pixabay.com/photos/japan-osaka-night-asia-landmark-2014619/",
		size: "large",
	},
	{
		id: 16,
		imgSrc:
			"https://cdn.pixabay.com/photo/2015/10/22/17/45/leaf-1001679_960_720.jpg",
		name: "Steven",
		link: "https://pixabay.com/photos/leaf-green-foliage-green-leaves-1001679/",
		size: "medium",
	},
	{
		id: 17,
		imgSrc:
			"https://cdn.pixabay.com/photo/2018/05/16/22/27/rose-3407234_960_720.jpg",
		name: "Rosee",
		link: "https://pixabay.com/photos/rose-red-drops-rain-macro-nature-3407234/",
		size: "medium",
	},
	{
		id: 18,
		imgSrc:
			"https://cdn.pixabay.com/photo/2018/01/29/19/00/park-3116883_960_720.jpg",
		name: "Arcoin",
		link: "https://pixabay.com/photos/park-bench-night-evening-fog-mist-3116883/",
		size: "large",
	},
	{
		id: 19,
		imgSrc:
			"https://cdn.pixabay.com/photo/2016/11/22/23/44/porsche-1851246_960_720.jpg",
		name: "Pexel",
		link: "https://pixabay.com/photos/porsche-car-brake-lights-1851246/",
		size: "small",
	},
	{
		id: 20,
		imgSrc:
			"https://cdn.pixabay.com/photo/2016/06/05/20/41/girl-1438138_960_720.jpg",
		name: "Xusenru",
		link: "https://pixabay.com/photos/girl-umbrella-rain-park-autumn-1438138/",
		size: "large",
	},
	{
		id: 21,
		imgSrc:
			"https://cdn.pixabay.com/photo/2017/03/16/20/20/man-2150164_960_720.jpg",
		name: "Fifalinana",
		link: "https://pixabay.com/photos/man-waterfalls-bathe-bathing-falls-2150164/",
		size: "large",
	},
	{
		id: 22,
		imgSrc:
			"https://cdn.pixabay.com/photo/2016/11/29/11/12/rain-1869119_960_720.jpg",
		name: "Pexel",
		link: "https://pixabay.com/photos/rain-woman-brunette-portrait-1869119/",
		size: "medium",
	},
	{
		id: 23,
		imgSrc:
			"https://cdn.pixabay.com/photo/2016/11/19/11/11/hands-1838659_960_720.jpg",
		name: "Pexel",
		link: "https://pixabay.com/photos/hands-plant-soil-grow-growing-1838659/",
		size: "medium",
	},
	{
		id: 24,
		imgSrc:
			"https://cdn.pixabay.com/photo/2019/01/25/11/18/girl-3954232_960_720.jpg",
		name: "Pexel",
		link: "https://pixabay.com/photos/girl-rain-femininity-beauty-paris-3954232/",
		size: "large",
	},
	{
		id: 25,
		imgSrc:
			"https://cdn.pixabay.com/photo/2013/02/20/10/32/snail-83672_960_720.jpg",
		name: "Larisa",
		link: "https://pixabay.com/illustrations/snail-drops-rain-raindrops-mollusk-83672/",
		size: "samll",
	},
	{
		id: 26,
		imgSrc:
			"https://cdn.pixabay.com/photo/2020/08/30/09/28/buildings-5528981_960_720.jpg",
		name: "China Town",
		link: "https://pixabay.com/photos/buildings-houses-street-city-rain-5528981/",
		size: "small",
	},
	{
		id: 27,
		imgSrc:
			"https://cdn.pixabay.com/photo/2017/03/12/02/20/triangle-2136288_960_720.jpg",
		name: "Pyramid",
		link: "https://pixabay.com/illustrations/triangle-sky-abstract-wallpaper-2136288/",
		size: "large",
	},
	{
		id: 28,
		imgSrc:
			"https://cdn.pixabay.com/photo/2020/04/02/23/01/rain-4996916_960_720.jpg",
		name: "Pyou",
		link: "https://pixabay.com/photos/rain-street-tables-cafe-flowers-4996916/",
		size: "small",
	},
	{
		id: 29,
		imgSrc:
			"https://cdn.pixabay.com/photo/2020/05/19/13/05/heart-5190672_960_720.jpg",
		name: "Heart",
		link: "https://pixabay.com/photos/heart-window-rain-drops-love-5190672/",
		size: "small",
	},
	{
		id: 30,
		imgSrc:
			"https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg",
		name: "cat",
		link: "https://pixabay.com/photos/cat-kitten-pet-kitty-young-cat-551554/",
		size: "large",
	},
];