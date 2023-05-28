import React, { useState } from "react"
import './Footer.css';
import { TbBrandGithub, TbBrandTwitter, TbBrandLinkedin } from 'react-icons/tb'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { AiFillCaretDown, AiOutlineSetting } from 'react-icons/ai'

const Footer = () => {



	return (
		<div>
			<div className='footer'>
				<div className='links'>
					<ul>
						<li><a href='https://github.com/thenew-programer' target={'_blank'}><TbBrandGithub className='icon' /></a></li>
						<li><a href='https://twitter.com/youssef_bouryal' target={'_blank'}><TbBrandTwitter className='icon' /></a></li>
						<li><a href='https://www.linkedin.com/in/youssef-bouryal/' target={'_blank'}><TbBrandLinkedin className='icon' /></a></li>
					</ul>
				</div>
				<div className="allRight">
					2023 &copy; all right Reserved.
				</div>
			</div>
		</div>
	)
}

export default Footer;
