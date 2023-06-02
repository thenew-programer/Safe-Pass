import React, { useEffect, useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
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



	useEffect(async () => {
		getUserInfo();
	}, [])



	const getUserInfo = () => {
		Axios.get(SERVER + '/user')
			.then((response) => {
				setId(response.data._id);
				setEmail(response.data.email);
			}).catch(() => {
				notifyFailure('Failed requestion server, Please refresh the page');
			});
	}



	const handleResetClick = () => {
		if (!newPass || !oldPass) {
			notifyFieldFailure('Fill all the fields');
		} else {
			Axios.patch(SERVER + 'update', {
				params: {
					id: id
				}
			}).then(() => {
				setErrorMsg('');
				notifySuccess('Password reset successfully');
			}).catch(() => {
				setErrorMsg('Old Password incorrect');
				notifyFailure('Reset password Failed');
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
		}).catch(console.log());

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
			</div>
		</div>
	)
}

export default Profile;
