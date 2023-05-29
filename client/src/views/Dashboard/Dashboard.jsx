import { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import Axios from 'axios';
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
	})



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
			</div>
		</div >
	)
}

export default Dashboard
