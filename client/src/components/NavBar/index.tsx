import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import '../../App.css';
import auth from '../../utils/auth';

const NavBar = () => {
	const [menuMode, setMenuMode] = useState<MenuProps['mode']>("horizontal");
	
	useEffect(() => {
		const handleResize = () => {
			setMenuMode(window.innerWidth < 768 ? "vertical" : "horizontal");
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // Call it once to set the initial state
		return () => {window.removeEventListener("resize", handleResize);};

	}, [])
	return (
		<Menu
			mode={menuMode}
			theme="dark"
			className="custom-nav-link"
			style={{ 
				justifyContent: "center",
				background: "var(--secondary)", 
				color: "var(--primary)", 
				marginTop: "45px", 
				marginBottom: "25px", width: "100%" }}>

			<Menu.Item
				key="posts"
				className="custom-nav-item"
			>
				<NavLink to="/schedule" 
				className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
				style={{ 
					padding: "5px", 
					display: "block", 
					color: "var(--primary)",
					background: "var(--secondary)", 
					fontSize: "1.5rem" }}
				>
					Schedule
				</NavLink>
			</Menu.Item>

			<Menu.Item
				key="new-post"
				className="custom-nav-item"
			>
				<NavLink to="/form"
				className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
				style={{ 
					padding: "5px", 
					display: "block", 
					color: "var(--primary)", 
					fontSize: "1.5rem" }}
				>
					New Event
				</NavLink>
			</Menu.Item>

			<Menu.Item
				key="logout"
				className="custom-nav-item"
				onClick={auth.logout}
			>
				<NavLink to="/" 
				className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
				style={{ 
					padding: "5px", 
					display: "block", 
					color: "var(--primary)", 
					fontSize: "1.5rem" }}
				>
					{auth.loggedIn() ? `Logout (${auth.getProfile().username})` : "Login/Signup"}
				</NavLink>
			</Menu.Item>

		</Menu>
	)
};

export default NavBar;