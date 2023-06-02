import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FaBars, FaHome } from 'react-icons/fa'
import { BiShow } from 'react-icons/bi'
import {MdOutlineBrowserUpdated} from 'react-icons/md'
import {BsDatabaseFillAdd} from 'react-icons/bs'
import { RiAccountCircleLine } from 'react-icons/ri'
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
			icon: <BsDatabaseFillAdd />,
		},
		{
			path: "/show",
			name: "My Passwords",
			icon: <BiShow />,
		},
		{
			path: "/update",
			name: "Update Password",
			icon: <MdOutlineBrowserUpdated />,
		},
		{
			path: '/remove',
			name: "Remove Pass",
			icon: <MdDelete />
		},
		{
			path: "/profile",
			name: "Profile",
			icon: <RiAccountCircleLine/>
		}
	];


	return (
		<div className='containers'>
			<div className="sidebar" style={{ width: isOpen ? '350px' : '70px' }}>
				<div className="top_section">
					<h1 style={{ display: isOpen ? 'block' : 'none' }}
						onClick={toggle}>SafePass</h1>
					<div className='icon' style={{ marginLeft: isOpen ? '20px' : '0px' }}>
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
		</div>
	);
};

export default Sidebar;
