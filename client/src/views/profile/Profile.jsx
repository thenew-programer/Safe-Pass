import React from 'react'
import './profile.css';

const Profile = () => {
	return (
		<div className='container'>
			<div className='text-wrapper'>
				<h1 className='name'>Youssef Bouryal</h1>
				<p className='discreption'>Beginner software developer, worked on this project from this <a href="https://www.youtube.com/watch?v=q9V7kLXvP3E&list=PLpPqplz6dKxXfVVta2i-kZQR_61ZKZmgJ&index=3&ab_channel=PedroTech" target={'_blank'}>tutorial</a>. I added some custom things, I design my own database, I change the structure of the code and many more. you can find the code in my <a href="https://github.com/thenew-programer/pass-manager" target={'_blank'}>github</a></p>
			</div>
		</div>
	)
}

export default Profile;
