import React, { useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import AddPassword from '../../views/addPassword/AddPassword';
import MyPasswords from '../../views/MyPasswords/MyPasswords';
import RmPassword from '../../views/RmPassword/RmPassword';
import Profile from '../../views/profile/Profile';
import Dashboard from '../../views/Dashboard/Dashboard';
import { CgAddR, CgRemoveR } from 'react-icons/cg';
import { FaBars, FaHome } from 'react-icons/fa'
import { BiShow } from 'react-icons/bi'
import './sidebar.css';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const menuItem = [
		{
			path: "/home",
			name: "Home",
			icon: <FaHome />,
		},
		{
			path: "/add",
			name: "Add Password",
			icon: <CgAddR />,
		},
		{
			path: "/show",
			name: "My Passwords",
			icon: <BiShow />,
		},
		{
			path: '/remove',
			name: "Remove Pass",
			icon: <CgRemoveR />
		}
	];


	return (
		<div className='containers'>
			<div className="sidebar" style={{ width: isOpen ? '350px' : '70px' }}>
				<div className="top_section">
					<h1 style={{ display: isOpen ? 'block' : 'none' }}
						onClick={toggle}>PMS</h1>
					<div className='icon' style={{ marginLeft: isOpen ? '200px' : '0px' }}>
						<FaBars onClick={toggle} />
					</div>
				</div>
				<div className='list-item'>
					{
						menuItem.map((item, i) => {
							return (
								<NavLink to={item.path} key={i} className='link'
									activeclassName='active'>
									<div className="icon">
										{item.icon}
									</div>
									<div style={{ display: isOpen ? 'block' : 'none' }}
										className="link_text">
										{item.name}
									</div>
								</NavLink>
							)
						})
					}
				</div>
			</div>
			<Routes>
				<Route exact path='/' element={<Profile />} />
				<Route path='/home' element={<Dashboard />} />
				<Route path='/add' element={<AddPassword />} />
				<Route path='/show' element={<MyPasswords />} />
				<Route path='/remove' element={<RmPassword />} />
			</Routes>
		</div>
	);
};

export default Sidebar;
