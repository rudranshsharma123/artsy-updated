import { toast } from "react-toastify";

// The function to handle the showing of the toast you see on the upper right hand side
export const toastySuccess = (message) => {
	toast(`🦄 ${message}`, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
	console.log("Showing The Toasty");
};
// The function to handle the showing of the toast you see on the upper right hand side

export const toastyFailure = (message) => {
	toast.error(`🦄 ${message}`, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
	console.log("Showing The error Toasty");
};
