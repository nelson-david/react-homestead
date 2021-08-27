import * as CgIcons from "react-icons/cg";
import * as AiIcons from "react-icons/ai";
import * as VscIcons from "react-icons/vsc";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import {Link} from "react-router-dom";
import CoverPhoto from "../../assets/img/main1.jpg";
import axios from "axios";
import {useState, useEffect} from "react";
import Modal from "react-modal";

const ProfileCard = ({current_user, user, devURL, token, devApi}) => {

	const [following, setFollowing] = useState(null);
	const [action, setAction] = useState(false);
	const [photoModal, setPhotoModal] = useState(false);

	useEffect(() => {
		const check_stats = user.followers.find(user => user.username === current_user.username);
		if (check_stats !== undefined){
			setFollowing(true);
		}else{
			setFollowing(false);
		}
	}, [user, current_user])

	const follow_user = (e) => {
		e.preventDefault();
		setAction(true);

		if (following === true){
			console.log("unfollowing");
			setFollowing(false);
			// axios({
			// 	method: 'PUT',
			// 	url: `${devApi}user/${user.username}/unfollow/`,
			// 	headers: {
			// 		'Authorization': token
			// 	}
			// }).then((res) => {
			// 	console.log(res);
			// 	setFollowing(false)
			// });
		}else{
			console.log("following");
			axios({
				method: 'PUT',
				url: `${devApi}user/${user.username}/follow/`,
				headers: {
					'Authorization': token
				}
			}).then((res) => {
				console.log(res);
				setFollowing(true)
			});
		}
		console.log("Done");
		setAction(false);
	}

	const togglePhotoModal = (e) => {
		setPhotoModal(!photoModal);
	}

	return(
		<>
			{
				photoModal?
				<PhotoModal
					devURL={devURL}
					current_user={current_user}
					togglePhotoModal={togglePhotoModal}
				/>:''
			}
			<div
				className="card profile__card"
				style={{
					backgroundImage: `url(${current_user.cover_photo==="cover_default.webp"?
						CoverPhoto : `${devURL}img/cover_photo/${current_user.cover_photo}`})`
				}}
			>
				<div className="transparent_profilediv">
					<div className="first">
						<img
							src={current_user.profile_picture!=="default.webp"?
								`${devURL}img/profile_photo/
								${current_user.profile_picture}`:
								CoverPhoto}
							alt="profile_picture"
							className="profile_picture"
							onClick={togglePhotoModal}
						/>
						<div className="user_details">
							<p
								className="username"
							>
								@{user.username}
							</p>
							<p
								className="user_followdetails"
							>
								<Link to={`/user/${user.username}/followers`}>
									Follower(s): {user.followers.length}</Link>
								<Link to={`/user/${user.username}/following`}>
									Following: {user.followed.length}</Link>
								<Link
									to="/user/posts"
									onClick={(e) => e.preventDefault()}
								>
									Posts: 14
								</Link>
							</p>
						</div>
					</div>
					<div className="user_biography">
						<p>{current_user.bio!==undefined || current_user.bio !== ''?
							current_user.bio:''}</p>
						<div className="button__div">
							{
								current_user.username !== user.username?
								<>
									{
										following !== null?
										<Link
											to="/user/nelson__david2"
											onClick={follow_user}
											id="first"
										>
											{
												action?
												<ImIcons.ImSpinner2 />
												:
												<>
												{
													following === true?
													'Unfollow'
													:'Follow'
												}
												</>
											}
										</Link>
										:''
									}

									<Link
										to="/profile/more"
										onClick={(e) => e.preventDefault()}
									>
										<BiIcons.BiMessageSquareDetail />
									</Link>
								</>
								:
								<>
									<Link to="/settings">
										Edit Profile
									</Link>
									<Link
										to="/profile/more"
										onClick={(e) => e.preventDefault()}
									>
										More...
									</Link>
								</>
							}
						</div>
					</div>
				</div>
			</div>
			<ProfileNavigation
				user={user}
			/>
		</>
	)
}

const ProfileNavigation = ({user}) => {
	return (
		<div className="profile__nav">
			<div className="profile__navscroll">
				<ul>
					<li
					>
						<Link
							to={`/user/${user.username}`}
							className="btn-block active">
							<CgIcons.CgFeed />
							Posts
						</Link>
					</li>
					<li
					>
						<Link
							to={`/user/${user.username}/tags`}
							className="btn-block">
							<AiIcons.AiFillTag />
							Tags
						</Link>
					</li>
					<li
					>
						<Link
							to={`/user/${user.username}/alerts`}
							className="btn-block">
							<VscIcons.VscBell />
							Notifications
						</Link>
					</li>
					<li
					>
						<Link
							to={`/user/${user.username}/albums`}
							className="btn-block">
							<BiIcons.BiAlbum />
							Albums
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

const PhotoModal = ({ devURL, current_user, togglePhotoModal}) => {
	Modal.setAppElement('#root');

	const [currentDiv, setCurrentDiv] = useState("profile");

	const switchDiv = (e) => {
		setCurrentDiv(e.target.dataset.component);
	}

	return (
		<Modal
			isOpen={true}
			className="photo__modal"
			overlayClassName="overlay photo__modaloverlay"
			style={{
				zIndex: "1000"
			}}
		>
			<div className="body">
				<TiIcons.TiTimes
					id="close_modal"
					onClick={togglePhotoModal}
				/>
				<div className="switch_tab" id={currentDiv}>
					<span
						data-component="profile"
						onClick={switchDiv}
					>Profile Picture</span>
					<span
						data-component="background"
						onClick={switchDiv}
					>Background Picture</span>
				</div>
				<br />
				<div className="content">
					{
						currentDiv === "profile"?
						<>
							<div className="first">
								<img
									src={current_user.profile_picture !== "default.webp" ?
										`${devURL}img/profile_photo/
											${current_user.profile_picture}` :
										CoverPhoto}
									alt="display_picture"
									id="profile_picture"
								/>
							</div>
							<input
								type="file"
							/>
						</>
						:
						<>
							<div className="first">
								<img
									src={current_user.cover_photo==="cover_default.webp"?
											CoverPhoto : `${devURL}img/cover_photo/
											${current_user.cover_photo}`}
									alt="display_picture"
									id="background_picture"
								/>
							</div>
							<input
								type="file"
							/>
						</>
					}
				</div>
			</div>
		</Modal>
	)
}

export default ProfileCard;