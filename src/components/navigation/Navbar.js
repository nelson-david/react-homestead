import '../../assets/css/navbar.css';
import {useState} from "react";
import { Link, withRouter} from "react-router-dom";
import SearchModal from "../misc/SearchModal";
import * as BsIcons from "react-icons/bs";
import * as VsIcons from "react-icons/vsc";
import Modal from "react-modal";
import * as CgIcons from "react-icons/cg";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";

const Navbar = ({activeComponent, logout, token, devApi, devURL,
	current_user, reloadPosts}) => {

	const bannedComponents = ["login", "register", "single_post"]
	const [searchModal, setSearchModal] = useState(false);
	const [logoutModal, setLogoutModal] = useState(false);
	const [bannedState, setBannedState] = useState(false);

	const toggleSearchModal = (e) => {
		e.preventDefault();
		setSearchModal(!searchModal);
	}

	const toggleLogoutModal = (e) => {
		e.preventDefault();
		setLogoutModal(!logoutModal);
	}

	return (
	<header className="custom__header">
		{
			searchModal?
			<SearchModal
				toggleSearchModal={toggleSearchModal}
				token={token}
				devApi={devApi}
				devURL={devURL}
				current_user={current_user}
				reloadPost={reloadPosts}
			/>:''
		}
		{
			logoutModal?
			<LogoutModal
				toggleLogoutModal={() => setLogoutModal(false)}
				logout={logout}
			/>:''
		}
		{
			bannedComponents.find(component => component === activeComponent) === activeComponent?
			'':
				<nav className="fixed-bottom bottom_navbar">
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
		}
	</header>
	)
}

const LogoutModal = ({toggleLogoutModal, logout}) => {
	Modal.setAppElement('#root');

	const callLogout = (e) => {
		logout(e);
		toggleLogoutModal();
	}

	return (
		<Modal
			isOpen={true}
			className="logout_modal"
			overlayClassName="overlay logout_modaloverlay"
			onRequestClose={toggleLogoutModal}
			style={{
				zIndex: "1000"
			}}
		>
			<div className="body">
				<p>Are You Sure You Want To Logout?</p>
				<div className="d-flex first">
					<button onClick={toggleLogoutModal}>
						No
					</button>

					<button onClick={callLogout}>
						Yes
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default withRouter(Navbar);