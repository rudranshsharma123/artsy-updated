export const pinFile = (pinApiKey, pinSecApiKey) => {
	const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
	let data = new FormData();
	data.append("file", fs.createReadStream("./1.png"));
	const metadata = JSON.stringify({
		name: "testname",
		keyvalues: {
			key1: "value1",
		},
	});
	data.append("pinataMetadata", metadata);
	const pinataOptions = JSON.stringify({
		cidVersion: 0,
		customPinPolicy: {
			regions: [
				{
					id: "FRA1",
					desiredReplicationCount: 1,
				},
				{
					id: "NYC1",
					desiredReplicationCount: 2,
				},
			],
		},
	});
	data.append("pinataOptions", pinataOptions);
	return axios
		.post(url, data, {
			maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
			headers: {
				"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
				pinata_api_key: pinApiKey,
				pinata_secret_api_key: pinSecApiKey,
			},
		})
		.then(function (response) {
			//handle response here
			console.log(response);
		})
		.catch(function (error) {
			//handle error here
		});
};
