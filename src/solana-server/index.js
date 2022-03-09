import axios from "axios";
import { actions, NodeWallet } from "@metaplex/js";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import {
	getParsedNftAccountsByOwner,
	createConnectionConfig,
} from "@nfteyez/sol-rayz";
import { base58_to_binary } from "base58-js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.TEST);

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.get("/", (req, res) => res.send("Hello World!"));
app.post("/mint", async (req, res) => {
	const info = req.body;

	const imageUrl = info.img;
	const nftName = info.name;
	const nftSymbol = info.symbol;
	const nftDesc = info.desc;

	const API_Key = process.env.API_Key;
	const API_Secret = process.env.API_Secret;
	console.log(info);
	const JsonData = {
		name: nftName,
		symbol: nftSymbol,
		description: nftDesc,
		seller_fee_basis_points: 500,
		external_url: "https://www.github.com/rudranshsharma123",
		attributes: [
			{
				trait_type: "NFT type",
				value: "Custom",
			},
		],
		collection: {
			name: "ArtsyCollection",
			family: "Your Custom NFTs",
		},
		properties: {
			files: [
				{
					uri: imageUrl,
					type: "image/png",
				},
			],
			category: "image",
			maxSupply: 1,
			creators: [
				{
					address: process.env.SOLANA_WALLET_ADDRESS,
					share: 100,
				},
			],
		},
		image: imageUrl,
	};
	const rest = await pinJSONToIPFS(API_Key, API_Secret, JsonData);
	console.log(rest);
	const url = "https://gateway.pinata.cloud/ipfs/" + rest;
	const lint = await mint(url, info.pubKey);

	res.send("done");
	// return "dopme";
});

app.post("/nft", async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const info = req.body;
	console.log(info.pubKey);
	const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
	const connect = createConnectionConfig(clusterApiUrl("devnet"));

	const pubKey = new PublicKey(info.pubKey);
	const nftsMetadata = await getParsedNftAccountsByOwner({
		publicAddress: pubKey,
		connection: connect,
		serialization: true,
	});

	// const nftsMetadata = await connection.getTokenAccountsByOwner(pubKey);
	console.log(nftsMetadata);
	res.send(nftsMetadata);
});

const pinJSONToIPFS = async (pinataApiKey, pinataSecretApiKey, JSONBody) => {
	const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
	const x = await axios
		.post(url, JSONBody, {
			headers: {
				pinata_api_key: pinataApiKey,
				pinata_secret_api_key: pinataSecretApiKey,
			},
		})
		.then(function (response) {
			//handle response here
			return response["data"]["IpfsHash"];
		})
		.catch(function (error) {
			//handle error here
		});
	return x;
};

const arr = base58_to_binary(process.env.SECRET_KEY_SOLANA);

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const mint = async (url, pubKey) => {
	const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
	const keypair = Keypair.fromSecretKey(arr);
	console.log(keypair);

	const mintNFTResponse = await actions.mintNFT({
		connection,
		wallet: new NodeWallet(keypair),
		uri: url,
		maxSupply: 1,
	});

	console.log(mintNFTResponse);
	const lint = mintNFTResponse["mint"];
	console.log(lint.toString());
	let userWallet = new PublicKey(pubKey);
	await sleep(5000);
	const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
		connection,
		keypair,
		lint,
		keypair.publicKey,
	);
	console.log(fromTokenAccount);
	const x = await actions.sendToken({
		connection,
		wallet: new NodeWallet(keypair),
		source: fromTokenAccount.address,
		destination: userWallet,
		mint: lint,
		amount: 1,
	});
	console.log(x);
};
