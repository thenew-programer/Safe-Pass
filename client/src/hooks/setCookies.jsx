import Cookies from "js-cookie"


export const SetCookies = (cookieName, value) => {
	Cookies.set(cookieName, value, {
		expires: 1,
		sameSite: 'strict',
		path: '/',
		secure: true,
	});
}

export default SetCookies;
