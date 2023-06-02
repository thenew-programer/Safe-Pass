import Cookies from "js-cookie"


export const setCookies = (cookieName, value) => {
	Cookies.set(cookieName, value, {
		expires: 1,
		sameSite: 'strict',
		path: '/',
		secure: true
	});
}


export const getCookies = (cookieName) => {
	return Cookies.get(cookieName);
}



export const removeCookies = (cookieName) => {
	Cookies.remove(cookieName);
}
