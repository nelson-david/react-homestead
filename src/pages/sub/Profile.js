import {Switch, Route, withRouter} from "react-router-dom";
import ProfileCard from "../../components/card/ProfileCard";
import ProfileSidebarCard from "../../components/card/ProfileSidebarCard";
import LoadingDiv from "../../components/misc/LoadingDiv";
import "../../assets/css/profile.css";
import {useEffect, useState} from "react";
import axios from "axios";
import * as ImIcons from "react-icons/im";

const Profile = ({posts, devURL, current_user, token, devApi}) => {

	var username = window.location.pathname.split('/')[2];

	const [user, setUser] = useState(null);
	const [fetching, setFetching] = useState(true);
	
	useEffect(() => {
		axios({
			method: 'GET',
			url: `${devApi}user/${username}/get/`,
			headers: {
				'Authorization': token
			}
		}).then((res) => {
			if (res.status === 200){
				setUser(res.data.user);
				setTimeout(() => {
					setFetching(false);
				}, 3500);
			}
		});
	}, [username, devApi, token]);

	return (
		<>
		{
			fetching?
			<div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12">
				<LoadingDiv
					icon={<ImIcons.ImSpinner4 />}
				/>
			</div>
			:
			<>
				<div className={`col-xl-6 col-lg-6 
					col-md-8 col-sm-7 col-12 profile__contentcol`}
					id="content_col">
					{
						user !== null?
						<>
							<ProfileCard
								current_user={current_user}
								user={user}
								devURL={devURL}
								devApi={devApi}
								token={token}
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
				<div className="col-xl-3 col-lg-3"
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
		}
		</>
	)
}

export default withRouter(Profile);