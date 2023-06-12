import { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import Axios from 'axios';
import './Dashboard.css';
import { isAuthenticated } from '../../middlewars/auth';
import { notifyFailure } from '../../utils/notifacations';
import { ToastContainer } from 'react-toastify';

// const SERVER = 'https://passwordmanager-l5wn.onrender.com/';
const SERVER = 'https://safe-pass-backend.vercel.app/';

const Dashboard = () => {

	const [passwordCount, setPasswordCount] = useState();
	Axios.defaults.withCredentials = true;



	const getpasswordCount = () => {
		Axios.get(SERVER + 'getpasswordcount').then((response) => {
			setPasswordCount(+response.data);
		}).catch((err) => {
			if (err.response.status === 405) {
				window.location.href = '/#/login';
			} else {
				setPasswordCount(0)
			}
		});
	}



	useEffect(() => {
		isAuthenticated().then(() => {
			getpasswordCount();
		}).catch((err) => {
			if (err.response.status === 405) {
				window.location.href = '/#/login';
			} else {
				notifyFailure('Failed to retrieve data. Try Again')
			}
		});
	}, []);


	return (
		<div className='dashboard'>
			<div className="dash-header">
				<h1 className='dash-title'>Safe-Pass</h1>
			</div>
			<div className="dash-main">
				<div className="card">
					<h4>You total Passwords </h4>
					<div className="pass-number">
						<h4>
							<CountUp start={0} end={passwordCount} duration={2} delay={0} />
						</h4>
					</div>
					<div>
						{
							passwordCount === 0 ? <p>
								You have 0 password try adding one and return back.
							</p>
								: ''
						}
					</div>
				</div>
				<ToastContainer />
			</div>
		</div >
	)
}

export default Dashboard
