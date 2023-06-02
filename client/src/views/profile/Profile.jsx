import React from 'react'
import './profile.css';

const Profile = () => {

	// const deleteAccount = () => {
	// 	Axios.delete(SERVER + UserId).then((response) => {
	// 		<Navigate />
	// 	})
	// }
	return (
		<div className='profile-container'>
			<div className="profile-wraper">
				<div className="user-data">
					<h4>Profile</h4>
					<label for="email"
						className='label-email'>Email</label>
					<input type="text" id='profile-email' value={'youssef@hello.com'}/>
					<label htmlFor="oldpassword"
						className='label-old-pass'>Old Password</label>
					<input type="text" id='oldpassword'  />
					<label htmlFor="newpassword"
						className='label-new-pass'>New Password</label>
					<input type="text" id='newpassword' />
				</div>
				<div className="delete-account">
					<button type="button">Delete Account</button>
				</div>
			</div>
		</div>
	)
}

export default Profile;
