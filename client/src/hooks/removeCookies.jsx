import Cookies from "js-cookie";


const RemoveCookies = (cookieName) => {
	Cookies.remove(cookieName);
}

export default RemoveCookies;
