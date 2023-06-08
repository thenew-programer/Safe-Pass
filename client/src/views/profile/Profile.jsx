import React, { useEffect, useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import Axios from 'axios';
import './profile.css';
import { notifyFailure, notifyFieldFailure, notifySuccess } from '../../utils/notifacations';

const SERVER = 'https://passwordmanager-l5wn.onrender.com/';



const Profile = () => {

	const [newPass, setNewPass] = useState('');
	const [oldPass, setOldPass] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [email, setEmail] = useState('');
	const [id, setId] = useState('');
	const [visible, setVisible] = useState(false);
	Axios.defaults.withCredentials = true;



	useEffect(() => {
		getUserInfo();
	}, [])



	const getUserInfo = () => {
		Axios.defaults.withCredentials = true;
		Axios.get(SERVER + 'user')
			.then((response) => {
				setId(response.data._id);
				setEmail(response.data.email);
			}).catch((err) => {
				if (err.response.status === 405) {
					window.location.href = '/#/login';
				} else {
					notifyFailure('Failed requestion server, Please refresh the page');
				}
			});
	}



	const handleResetClick = () => {
		if (!newPass || !oldPass) {
			notifyFieldFailure('Fill all the fields');
		} else {
			Axios.patch(SERVER + 'update', {
				params: {
					id: id
				},
				body: {
					oldPass: oldPass,
					newPass: newPass
				}
			}).then(() => {
				setErrorMsg('');
				notifySuccess('Password reset successfully');
			}).catch((err) => {
				if (err.response.status === 405) {
					window.location.href = '/#/login'
				} else if (err.response.status === 401) {
					notifyFailure('Old password incorrect')
				} else {
					notifyFailure('Reset password Failed');
				}
			})
		}
	}

	const handleDeleteClick = () => {
		console.log('we did not delete your account, this feature is comming.');
		Axios.delete(SERVER + '/delete', {
			params: {
				id: id
			}
		}).then(() => {
			console.log('you fucked up');
		}).catch((err) => {
			if (err.response.status === 405) {
				window.location.href = '/#/login';
			} else {
				notifyFailure('Failed to delete your account, try again.')
			}
		});

	}



	return (
		<div className='profile-container'>
			<div className="profile-wraper">
				<div className="user-data">
					<h4>Profile</h4>
					<label for="email"
						className='label-email'>Email</label>
					<input type="text" id='profile-email' value={email} />
					<label htmlFor="oldpassword"
						className='label-old-pass'>Old Password</label>
					<input type={visible ? 'text' : 'password'}
						id='oldpassword'
						onChange={e => setOldPass(e.target.value)} />
					<div className="visibility-top" onClick={() => setVisible(!visible)}>
						{
							visible ? <AiOutlineEyeInvisible size={20} />
								: <AiOutlineEye size={20} />
						}
					</div>
					<label htmlFor="newpassword"
						className='label-new-pass'>New Password</label>
					<input type={visible ? 'text' : 'password'}
						id='newpassword'
						onChange={e => setNewPass(e.target.value)} />
					<div className="visibility-bottom" onClick={() => setVisible(!visible)}>
						{
							visible ? <AiOutlineEyeInvisible size={20} />
								: <AiOutlineEye size={20} />
						}
					</div>
					<p style={{
						color: 'red',
						fontSize: '0.824rem', margin: 'auto',
						marginTop: 0
					}}>{errorMsg}</p>
					<button type="button"
						onClick={handleResetClick}>Reset Password</button>
				</div>
				<div className="delete-account">
					<button type="button"
						onClick={handleDeleteClick}>Delete Account</button>
				</div>
				<ToastContainer />
			</div>
		</div>
	)
}

export default Profile;
