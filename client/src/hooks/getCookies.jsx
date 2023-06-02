import Cookies from "js-cookie";


const GetCookies = (cookieName) => {
	return Cookies.get(cookieName);
}

export default GetCookies
