import './MyPasswords.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCopy } from 'react-icons/bi'
import { ToastContainer } from 'react-toastify';
import { notifySuccess } from '../../utils/notifacations';
import { isAuthenticated } from '../../middlewars/auth';


const SERVER = "https://passwordmanager-l5wn.onrender.com/";

const MyPasswords = () => {

	const [passwordList, setPasswordList] = useState([]);
	const [query, setQuery] = useState('');


	useEffect(() => {
		auth();
	}, []);


	const auth = async () => {
		try {
			await isAuthenticated();

			const response = Axios.get(SERVER + 'showpasswords');
			setPasswordList(response.data);
		} catch (err) {
			window.location.href = '/#/login';
		}
	}


	const downloadPass = () => {
		Axios.get(SERVER + 'downloadPass', { responseType: 'blob' }).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'my-passwords.csv');
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			notifySuccess('Downloaded successfully!');
		}).catch(console.log);
	}



	const decryptPassword = (encryption) => {
		Axios.post(SERVER + 'decrypt', {
			password: encryption.password,
			iv: encryption.iv
		}).then((response) => {
			setPasswordList(
				passwordList.map((item) => {
					item.pass = '⏺⏺⏺⏺⏺⏺';
					return item.id === encryption.id ? {
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



	return (
		<div className='container'>
			<ToastContainer />
			<div className="search-field">
				<input type="text" placeholder='search..'
					onChange={event => {
						setQuery(event.target.value);
					}} />
				<button type="button" className='button'
					onClick={downloadPass}>Download</button>
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
										<BiCopy size={20} />
									</button>
								</CopyToClipboard>
								<br />
								<span className='label'>Email-user</span>
								<CopyToClipboard text={item.User}>
									<button className='cp-btn btn-email' type="button">
										<BiCopy size={20} />
									</button>
								</CopyToClipboard>
								<span className='email-span'>{item.User}</span>
								<br />
								<span className='label'>pass</span>
								<CopyToClipboard text={item.pass}>
									<button className='cp-btn btn-pass' type="button">
										<BiCopy size={20} />
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
