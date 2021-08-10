import {Link, withRouter, Switch, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
//import SinglePost from "../../components/sub/SinglePost";
import CoverPhoto from "../../assets/img/main1.jpg";
import "../../assets/css/profile.css";

import * as CgIcons from "react-icons/cg";
import * as AiIcons from "react-icons/ai";
import * as VscIcons from "react-icons/vsc";
import * as BiIcons from "react-icons/bi";

const NavItems = [
	{
		text: "Posts",
		icons: <CgIcons.CgFeed />
	},
	{
		text: "Tags",
		link: "/tags",
		icons: <AiIcons.AiFillTag />
	},
	{
		text: "Notifications",
		link: "/alerts",
		icons: <VscIcons.VscBell />
	},
	{
		text: "Albums",
		link: "/albums",
		icons: <BiIcons.BiAlbum />
	},
]

const Profile = ({devApi, token, current_user, posts, devURL}) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// var username = window.location.pathname.split('/')[2];
		// username = username.slice(1, username.length);
		// console.log(username);
		axios({
			method: 'GET',
			url: `${devApi}user/nelson__david2/get/`,
			headers: {
				'Authorization': token
			}
		}).then((res) => {
			if (res.data.message === true){
				setUser(res.data.user)
			}
		});
	}, [devApi, token]);

	return (
		<div className={`col-xl-6 col-lg-6 
			col-md-7 col-sm-10 col-12`}
			id="content_col">
			{
				user !== null?
				<>
				{
					user!==null?
					<>
						<div className="card profile__card">
							<div className="transparent_profilediv">
								<div className="first">
									<img
										src={CoverPhoto}
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
											<Link to={`/user/@${user.username}/followers`}>
												Followers: 455</Link>
											<Link to={`/user/@${user.username}/following`}>
												Following: 455</Link>
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
									<p>
										Apex Legends Top Gamer For 2021💓 | Frontend
										Web Designer💻 & Content Creator🗒 |
										Proud Taurus♉
									</p>
									<div className="button__div">
										<Link to="/edit/profile">
											Edit Profile
										</Link>
										<Link
											to="/profile/more"
											onClick={(e) => e.preventDefault()}
										>
											More...
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="profile__nav">
							<div className="profile__navscroll">
								<ul>
								{
									NavItems.map((value, index) => {
										return (
											<li
												key={index}
											>
												<Link
													to={`/user/nelson__david2
														${value.link!==undefined?value.link:''}`}
													className="btn-block active">
													{value.icons}
													{value.text}
												</Link>
											</li>
										)
									})
								}
								</ul>
							</div>
						</div>
						<br />
						<Switch>
							<Route exact path={`/user/nelson__david2`}>
								<h2>Home Man</h2>
							</Route>
							<Route path={`/user/nelson__david2/alerts`}>
								<h2>Notifications Man</h2>
							</Route>
						</Switch>
					</>
					:
					<UserProfile
						user={user}
					/>
				}
				</>:''
			}
		</div>
	)
}

// const CurrentUserProfile = ({user, posts, devURL, token, current_user, devApi}) => {
// 	return (
// 		<p>Hello World</p>
// 	)
// }

const UserProfile = ({user}) => {
	return (
		<>
			<div className="card profile__card">
			</div>
		</>
	)
}

export default withRouter(Profile);


		// const state = String(shortTextRef.current.lastChild.dataset.short);
		// if (state === "true"){
		// 	shortTextRef.current.firstChild.innerText = 
		// 		shortTextRef.current.lastChild.dataset.text;
		// 	shortTextRef.current.lastChild.dataset.short = "false"
		// 	shortTextRef.current.lastChild.innerText = " see less..."
		// }
		// if (state === "false"){
		// 	shortTextRef.current.firstChild.innerText =
		// 		shortTextRef.current.firstChild.innerText.slice(0,200)
		// 	shortTextRef.current.lastChild.dataset.short = "true"
		// 	shortTextRef.current.lastChild.innerText = " see more..."
		// }