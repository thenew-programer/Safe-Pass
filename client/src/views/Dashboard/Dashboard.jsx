import { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import Axios from 'axios';
import { TbBrandGithub, TbBrandTwitter, TbBrandLinkedin } from 'react-icons/tb'
import './Dashboard.css';

const SERVER = 'https://passwordmanager-l5wn.onrender.com/';

const Dashboard = () => {

	const [passwordCount, setPasswordCount] = useState();



	const getpasswordCount = () => {
		Axios.get(SERVER + 'getpasswordcount').then((response) => {
			setPasswordCount(+response.data);
		}).catch(() => setPasswordCount(0));
	}



	useEffect(() => {
		if (typeof passwordCount === 'undefined') {
			getpasswordCount();
		}
	}, [])

	return (
		<div className='dashboard'>
			<div className="dash-header">
				<h1 className='dash-title'>saFE<span>PAss.</span></h1>
				<button type="button"><a href="#how-to">How to use</a></button>
			</div>
			<div className="dash-main">
				<div className="card">
					<h4>Password</h4>
					<div className="pass-number">
						<h4>
							<CountUp start={0} end={passwordCount} duration={2} delay={0} />
						</h4>
					</div>
					<div className='pass-msg'></div>
				</div>
			</div>
			<div id='how-to' className="how-to">
				<h1>How to use the software</h1>
				<p className="howto">

				</p>
			</div>
			<div className='dash-footer'>
				<div className='dash-links'>
					<ul>
						<li><a href='https://github.com/thenew-programer' target={'_blank'}><TbBrandGithub className='icon' /></a></li>
						<li><a href='https://twitter.com/youssef_bouryal' target={'_blank'}><TbBrandTwitter className='icon' /></a></li>
						<li><a href='https://www.linkedin.com/in/youssef-bouryal/' target={'_blank'}><TbBrandLinkedin className='icon' /></a></li>
					</ul>
				</div>
				<div className="dash-allRight">
					2023 &copy; all right Reserved.
				</div>
			</div>
		</div >
	)
}

export default Dashboard
