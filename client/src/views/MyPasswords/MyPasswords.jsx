import './MyPasswords.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';

const SERVER = "https://passwordmanager-l5wn.onrender.com/";

const MyPasswords = () => {

	const [passwordList, setPasswordList] = useState([]);
	const [query, setQuery] = useState('');
	const [backup, setBackup ] = useState([]);
	const [stringSize, setStringSize] = useState(0);
	useEffect(() => {
		Axios.get(SERVER + 'showpasswords').then((response) => {
			setPasswordList(response.data)
			setBackup(response.data)
		})
	}, []);

	useEffect(() => {
		if (query.length === 0)
		{
		setPasswordList(backup);
		}
	}, [stringSize])

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
						setStringSize(query.length);
						setPasswordList(search());
					}} />
			</div>
			<div className="passwords">
				{
					passwordList.map((item, key) => {
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
								key={key}>
								<span className='site-span'>{item.Site}</span>
								<br />
								<span className='label'>Email-user</span>
								<span className='email-span'>{item.User}</span>
								<br />
								<span className='label'>pass</span>
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
