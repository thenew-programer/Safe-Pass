import './MyPasswords.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';

const SERVER = "https://passwordmanager-l5wn.onrender.com/";

const MyPasswords = () => {

	const [passwordList, setPasswordList] = useState([]);
	useEffect(() => {
		Axios.get(SERVER + 'showpasswords').then((response) => {
			setPasswordList(response.data);
		})
	}, []);

	const decryptPassword = (encryption) => {
		Axios.post(SERVER + 'decrypt', {
			password: encryption.password,
			iv: encryption.iv
		}).then((response) => {
			setPasswordList(
				passwordList.map((item) => {
					return item.id == encryption.id ? {
						id: item.id,
						Password: item.Password,
						Site: item.Site,
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
			<h5>Click to show password</h5>
			<div className="passwords">
				<div className="password">
					{
						passwordList.map((item, key) => {
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
									<span>{item.Site}</span>
									<br />
									<span>pass: {item.pass}</span>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	);
};

export default MyPasswords;
