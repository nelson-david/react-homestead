import * as CgIcons from "react-icons/cg";
import * as AiIcons from "react-icons/ai";
import * as VscIcons from "react-icons/vsc";
import * as BiIcons from "react-icons/bi";
import {Link} from "react-router-dom";
import CoverPhoto from "../../assets/img/main1.jpg";

const ProfileCard = ({current_user, user, devURL}) => {
	return(
		<>
			<div
				className="card profile__card"
				style={{
					backgroundImage: `url(${current_user.cover_photo==="cover_default.webp"?
						CoverPhoto : `${devURL}img/cover_photo/
						${current_user.cover_photo}`})`
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
									<Link
										to="/user/nelson__david2"
										onClick={(e) => e.preventDefault()}
									>
										Follow
									</Link>
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

export default ProfileCard;