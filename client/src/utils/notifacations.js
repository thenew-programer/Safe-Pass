import { toast } from "react-toastify";


export const clear = target => {
	if (target.value != null)
		target.value = "";
}



export const notifyFieldFailure = (msg) => {
	toast.warn(msg, {
		position: "top-center",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
}



export const notifyFailure = (msg) => {
	toast.error(msg, {
		position: "top-center",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
}



export const notifySuccess = (msg) => {
	toast.success(msg, {
		position: "top-center",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
}



