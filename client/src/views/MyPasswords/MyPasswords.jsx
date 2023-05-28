import './MyPasswords.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCopy } from 'react-icons/bi'


const SERVER = "https://passwordmanager-l5wn.onrender.com/";

const MyPasswords = () => {

	const [passwordList, setPasswordList] = useState([]);
	const [query, setQuery] = useState('');



	useEffect(() => {
		Axios.get(SERVER + 'showpasswords').then((response) => {
			setPasswordList(response.data)
		})
	}, []);



	const decryptPassword = (encryption) => {
		Axios.post(SERVER + 'decrypt', {
			password: encryption.password,
			iv: encryption.iv
		}).then((response) => {
			setPasswordList(
				passwordList.map((item) => {
					item.pass = '⏺⏺⏺⏺⏺⏺';
					return item.id == encryption.id ? {
						id: item.id,
						Password: item.Password,
						Site: item.Site,
						User: item.User,
						Iv: item.Iv,
						pass: response.data
					}
						: item;
				})
			);
		})
	};



	const search = () => {
		return passwordList.filter((item) => item.Site.toLowerCase().includes(query) ||
			item.User.toLowerCase().includes(query));
	}



	return (
		<div className='container'>
			<h5>Search using website or email</h5>
			<div className="search-field">
				<input type="text" placeholder='search..'
					onChange={event => {
						setQuery(event.target.value);
					}} />
			</div>
			<div className="passwords">
				{
					passwordList.filter((item) => {
						return query.toLowerCase() === '' ?
							item : item.Site.toLowerCase().includes(query) ||
							item.User.toLowerCase().includes(query)
					}).map((item, key) => {
						if (!item.Site) item.Site = 'No Site';
						return (
							<div
								className='pass'
								onClick={() => {
									decryptPassword({
										password: item.Password,
										iv: item.Iv,
										id: item.id,
									})
								}}
								key={key} >
								<span className='site-span'>{item.Site}</span>
								<CopyToClipboard text={item.Site}>
									<button className='cp-btn btn-site' type="button">
										<BiCopy />
									</button>
								</CopyToClipboard>
								<br />
								<span className='label'>Email-user</span>
								<CopyToClipboard text={item.User}>
									<button className='cp-btn btn-email' type="button">
										<BiCopy />
									</button>
								</CopyToClipboard>
								<span className='email-span'>{item.User}</span>
								<br />
								<span className='label'>pass</span>
								<CopyToClipboard text={item.pass}>
									<button className='cp-btn btn-pass' type="button">
										<BiCopy />
									</button>
								</CopyToClipboard>
								<span className='password-span'>{item.pass}</span>
							</div>
						)
					})
				}
			</div>
		</div>
	);
};

export default MyPasswords;
