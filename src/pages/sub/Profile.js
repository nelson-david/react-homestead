import {Switch, Route, withRouter} from "react-router-dom";
import ProfileCard from "../../components/card/ProfileCard";
import ProfileSidebarCard from "../../components/card/ProfileSidebarCard";
import "../../assets/css/profile.css";
import {useEffect, useState} from "react";
import axios from "axios";

const Profile = ({posts, devURL, current_user, token, devApi}) => {

	var username = window.location.pathname.split('/')[2];
	const [user, setUser] = useState(null);

	useEffect(() => {
		axios({
			method: 'GET',
			url: `${devApi}user/${username}/get/`,
			headers: {
				'Authorization': token
			}
		}).then((res) => {
			if (res.data.message === true){
				setUser(res.data.user);
			}
		});
	}, [username, devApi, token]);

	return (
		<>
		<div className={`col-xl-6 col-lg-6 
			col-md-7 col-sm-10 col-12`}
			id="content_col">
			{
				user !== null?
				<>
					<ProfileCard
						current_user={current_user}
						user={user}
					/>

					<Switch>
						<Route exact path={`/user/${username}`}>
							<div className="card p-3 ">
								<h1>Hello Post Section</h1>
							</div>
						</Route>
						<Route path={`/user/${username}/followers`}>
							<div className="card p-3 ">
								<h1>Hello Followers Section</h1>
							</div>
						</Route>
						<Route path={`/user/${username}/tags`}>
							<div className="card p-3 ">
								<h1>Hello Hashtags Application</h1>
							</div>
						</Route>
						<Route path={`/user/${username}/alerts`}>
							<div className="card p-3 ">
								<h1>Hello Picks Alerts</h1>
							</div>
						</Route>
						<Route path={`/user/${username}/albums`}>
							<div className="card p-3 ">
								<h1>Hello Picks Albums</h1>
							</div>
						</Route>
					</Switch>
					<br />
					<br />
					<br />
				</>:''
			}
		</div>
		<div className="col-xl-3 col-lg-4"
			id="rightbar_col">
			{
				user !== null?
				<ProfileSidebarCard
					user={user}
					current_user={current_user}
				/>:''
			}
		</div>
		</>
	)
}

export default withRouter(Profile);