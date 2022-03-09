import axios from "axios";
//var axios = require('axios')

const DEFAULT_NODE_URL = "https://api.desodev.com/api";
//const DEFAULT_NODE_URL = "https://api.desodev.com/api"
let client = null;

// different api endpoints are very aptly named and also the description has been provided in the api documentation


class DesoApi {
	constructor() {
		this.client = null;
		this.baseUrl = DEFAULT_NODE_URL;
	}

	async getPostsForPublicKey(
		username,
		publicKey,
		lastPostHashHex,
		numToFetch = 10,
	) {
		if (!username && !publicKey) {
			console.log("username or publicKey is required");
			return;
		}

		const path = "/v0/get-posts-for-public-key";
		const data = {
			PublicKeyBase58Check: publicKey,
			Username: username,
			ReaderPublicKeyBase58Check: "",
			LastPostHashHex: lastPostHashHex,
			NumToFetch: numToFetch,
			MediaRequired: false,
		};
		try {
			const result = await this.getClient().post(path, data);
			return result.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async getSingleProfile(publicKey, username) {
		if (!publicKey && !username) {
			console.log("publicKey or username is required");
			return;
		}

		const path = "/v0/get-single-profile";
		const data = {
			PublicKeyBase58Check: publicKey,
			Username: username,
		};

		try {
			const result = await this.getClient().post(path, data);
			return result.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async makeNftBids(publciKey, NFTPostHashHex, SerialNumber, BidAmount) {
		if (!publciKey) {
			console.log("publicKey is required");
			return;
		}

		if (!NFTPostHashHex) {
			console.log("NFTPostHashHex is required");
			return;
		}

		if (!SerialNumber) {
			console.log("SerialNumber is required");
			return;
		}

		if (!BidAmount) {
			console.log("BidAmount is required");
			return;
		}

		const path = "/v0/make-nft-bid";
		const data = {
			UpdaterPublicKeyBase58Check: publciKey,
			NFTPostHashHex: NFTPostHashHex,
			SerialNumber: SerialNumber,
			BidAmountNanos: BidAmount,
			MinFeeRateNanosPerKB: 1000,
		};
		try {
			const res = await this.getClient().post(path, data);
			return res.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async transferNftBids(
		senderPublciKey,
		recieverPublicKey,
		NFTPostHashHex,
		SerialNumber,
		BidAmount,
	) {
		if (!senderPublciKey) {
			console.log("senderPublciKey is required");
			return;
		}

		if (!recieverPublicKey) {
			console.log("recieverPublicKey is required");
			return;
		}

		if (!NFTPostHashHex) {
			console.log("NFTPostHashHex is required");
			return;
		}

		if (!SerialNumber) {
			console.log("SerialNumber is required");
			return;
		}

		if (!BidAmount) {
			console.log("BidAmount is required");
			return;
		}

		const path = "/v0/transfer-nft-bid";
		const data = {
			SenderPublicKeyBase58Check: senderPublciKey,
			RecieverPublicKeyBase58Check: recieverPublicKey,
			NFTPostHashHex: NFTPostHashHex,
			SerialNumber: SerialNumber,
			EncryptedUnlockableText: "",
			BidAmountNanos: BidAmount,
			MinFeeRateNanosPerKB: 1000,
		};
		try {
			const res = await this.getClient().post(path, data);
			return res.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async acceptNftTransfer(publciKey, NFTPostHashHex, SerialNumber) {
		if (!publciKey) {
			console.log("publicKey is required");
			return;
		}

		if (!NFTPostHashHex) {
			console.log("NFTPostHashHex is required");
			return;
		}

		if (!SerialNumber) {
			console.log("SerialNumber is required");
			return;
		}

		const path = "/v0/accept-nft-transfer";
		const data = {
			UpdaterPublicKeyBase58Check: publciKey,
			NFTPostHashHex: NFTPostHashHex,
			SerialNumber: SerialNumber,
			MinFeeRateNanosPerKB: 1000,
		};
		try {
			const res = await this.getClient().post(path, data);
			return res.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async acceptNftBid(
		publciKey,
		bidderPublicKey,
		NFTPostHashHex,
		SerialNumber,
		BidAmount,
	) {
		if (!publciKey) {
			console.log("publicKey is required");
			return;
		}

		if (!bidderPublicKey) {
			console.log("bidderPublicKey is required");
			return;
		}

		if (!NFTPostHashHex) {
			console.log("NFTPostHashHex is required");
			return;
		}

		if (!SerialNumber) {
			console.log("SerialNumber is required");
			return;
		}

		if (!BidAmount) {
			console.log("BidAmount is required");
			return;
		}

		const path = "/v0/accept-nft-bid";
		const data = {
			UpdaterPublicKeyBase58Check: publciKey,
			NFTPostHashHex: NFTPostHashHex,
			SerialNumber: SerialNumber,
			BidderPublicKeyBase58Check: bidderPublicKey,
			BidAmountNanos: BidAmount,
			MinFeeRateNanosPerKB: 1000,
		};
		try {
			const res = await this.getClient().post(path, data);
			return res.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async burnNft(publciKey, NFTPostHashHex, SerialNumber) {
		if (!publciKey) {
			console.log("publicKey is required");
			return;
		}

		if (!NFTPostHashHex) {
			console.log("NFTPostHashHex is required");
			return;
		}

		if (!SerialNumber) {
			console.log("SerialNumber is required");
			return;
		}

		const path = "/v0/burn-nft";
		const data = {
			UpdaterPublicKeyBase58Check: publciKey,
			NFTPostHashHex: NFTPostHashHex,
			SerialNumber: SerialNumber,
			MinFeeRateNanosPerKB: 1000,
		};
		try {
			const res = await this.getClient().post(path, data);
			return res.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async getSinglePost(
		postHash,
		commentLimit = 20,
		fetchParents = false,
		commentOffset = 0,
		addGlobalFeedBool = false,
	) {
		if (!postHash) {
			console.log("postHash is required");
			return;
		}

		const path = "/v0/get-single-post";
		const data = {
			PostHashHex: postHash,
			ReaderPublicKeyBase58Check: "",
			FetchParents: fetchParents,
			CommentOffset: commentOffset,
			CommentLimit: commentLimit,
			AddGlobalFeedBool: addGlobalFeedBool,
		};
		try {
			const result = await this.getClient().post(path, data);
			return result.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async getNfts(publciKey) {
		if (!publciKey) {
			console.log("publicKey is required");
			return;
		}
		const path = "/v0/get-nfts-for-user";
		const data = {
			UserPublicKeyBase58Check: publciKey,
		};
		try {
			const res = await this.getClient().post(path, data);
			return res.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async createNftTxn(
		publciKey,
		postHex,
		numCopies = 2,
		nftRoyalityToCreatorBasisPoints = 0,
		nftRoyalityToCoinBasisPoints = 0,
		hasUnlockable = false,
		isForSale = true,
		buyNowPrice = 0,
		mintFeeRate = 1000,
	) {
		if (!publciKey) {
			console.log("publicKey is required");
			return;
		}

		if (!postHex) {
			console.log("postHex is required");
			return;
		}

		//

		const path = "/v0/create-nft";
		const data = {
			UpdaterPublicKeyBase58Check: publciKey,
			NFTPostHashHex: postHex,
			NumCopies: numCopies,
			NFTRoyaltyToCreatorBasisPoints: nftRoyalityToCreatorBasisPoints,
			NFTRoyaltyToCoinBasisPoints: nftRoyalityToCoinBasisPoints,
			HasUnlockable: hasUnlockable,
			IsForSale: isForSale,
			IsBuyNow: true,
			BuyNowPriceNanos: buyNowPrice,
			MinFeeRateNanosPerKB: 1000,
		};
		try {
			const res = await this.getClient().post(path, data);
			return res.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async submitPost(publicKey, body, postExtraData) {
		if (!publicKey) {
			console.log("publicKey is required");
			return;
		}

		if (!body) {
			console.log("body is required");
			return;
		}

		const path = "/v0/submit-post";
		const data = {
			UpdaterPublicKeyBase58Check: publicKey,
			PostHashHexToModify: "",
			ParentStakeID: "",
			Title: "",
			BodyObj: { Body: body, ImageURLs: [] },
			RecloutedPostHashHex: "",
			PostExtraData: postExtraData,
			Sub: "",
			IsHidden: false,
			MinFeeRateNanosPerKB: 1000,
		};
		try {
			const result = await this.getClient().post(path, data);
			return result.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async createPostForNfts(
		publicKey,
		body,
		imageUrl = [],
		vidsUrl = [],
		postExtraData,
	) {
		if (!publicKey) {
			console.log("publicKey is required");
			return;
		}

		if (!body) {
			console.log("body is required");
			return;
		}

		const path = "/v0/submit-post";
		const data = {
			UpdaterPublicKeyBase58Check: publicKey,
			PostHashHexToModify: "",
			ParentStakeID: "",
			Title: "",
			BodyObj: { Body: body, ImageURLs: imageUrl },
			RecloutedPostHashHex: "",
			PostExtraData: postExtraData,
			Sub: "",
			IsHidden: false,
			MinFeeRateNanosPerKB: 1000,
		};
		try {
			const result = await this.getClient().post(path, data);
			return result.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async submitTransaction(signedTransactionHex) {
		if (!signedTransactionHex) {
			console.log("signedTransactionHex is required");
			return;
		}

		const path = "/v0/submit-transaction";
		const data = {
			TransactionHex: signedTransactionHex,
			MinFeeRateNanosPerKB: 1000,
		};
		try {
			const result = await this.getClient().post(path, data);
			return result.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async getUsersStateless(publicKeyList, skipForLeaderboard) {
		if (!publicKeyList) {
			console.log("publicKeyList is required");
			return;
		}

		const path = "/v0/get-users-stateless";
		const data = {
			PublicKeysBase58Check: publicKeyList,
			SkipForLeaderboard: skipForLeaderboard,
		};
		try {
			const result = await this.getClient().post(path, data);
			return result.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async getProfilesPartialMatch(partialName) {
		if (!partialName) {
			console.log("partialName is required");
			return;
		}

		const path = "/v0/get-profiles";
		const data = {
			ReaderPublicKeyBase58Check: "",
			UsernamePrefix: partialName,
		};
		try {
			const result = await this.getClient().post(path, data);
			return result.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	getClient() {
		if (client) return client;
		client = axios.create({
			baseURL: this.baseUrl,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		return client;
	}
}

export default DesoApi;
