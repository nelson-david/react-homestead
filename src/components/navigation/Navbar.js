import '../../assets/css/navbar.css';
import {Link} from "react-router-dom";
// import * as BsIcons from "react-icons/bs";
import * as VsIcons from "react-icons/vsc";
import * as CgIcons from "react-icons/cg";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";

const Navbar = ({activeComponent, logout, token}) => {

	return (
	<header className="custom__header">
		<nav className="navbar navbar-expand custom__navbar">
			<Link className="navbar-brand navbar__brand" to="/">
				Home Stead<i> .</i>
			</Link>
			<nav className="nav_content second">
				<ul className="navbar-nav">
					<li className="nav-item" id="sidebar_li">
							{
								activeComponent === "login" ?
								<Link to="/register">
									<VsIcons.VscSignIn />
									Sign Up
								</Link>
								:''
							}
							{
								activeComponent === "register" ?
								<Link to="/login">
									<VsIcons.VscSignIn />
									Sign In
								</Link>
								:''
							}
							{
								token?
								<Link to="/logout" onClick={logout}>
									<VsIcons.VscSignOut />
									Logout
								</Link>:''
							}
					</li>
				</ul>
			</nav>
		</nav>

		<nav aria-label="breadcrumb" className="fixed-bottom bottom_navbar">
			<ol className="breadcrumb" id="bottom_navbar">
				<li className="breadcrumb-item">
					<Link to="/" className="active">
						<CgIcons.CgFeed />
					</Link>
				</li>
				<li className="breadcrumb-item">
					<Link to="true">
						<AiIcons.AiOutlineMessage />
					</Link>
				</li>
				<li className="breadcrumb-item">
					<Link to="/notifications">
						<VsIcons.VscBell />
					</Link>
				</li>
				<li className="breadcrumb-item">
					<Link to="/explore">
						<GiIcons.GiCompass />
					</Link>
				</li>	
				<li className="breadcrumb-item">
					<Link to="/profile">
						<BiIcons.BiUserCircle />
					</Link>
				</li>
			</ol>
		</nav>
	</header>
	)
}

export default Navbar;