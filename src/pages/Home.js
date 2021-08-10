import {Route, Switch} from "react-router-dom";
import CreatePostCard from "../components/card/CreatePostCard";
import Sidebar from "../components/navigation/Sidebar";
import SuggestionCard from "../components/card/SuggestionCard";
import PostContent from "./sub/PostContent";
import SinglePostSection from "./sub/SinglePostSection";
import {useState, useEffect} from "react";
import Explore from "./sub/Explore";
import Profile from "./sub/Profile";

const Home = ({setCurrentComponent, token, devApi, current_user,
	posts, devURL, reloadPosts}) => {

	const [upload_success, setUploadSuccess] = useState(false);

	useEffect(() => {
		setCurrentComponent();
	}, [setCurrentComponent])

	const callSuccessFunction = () => {
		setUploadSuccess(!upload_success);
		console.log("Called Reload Posts...");
		reloadPosts();
	}

	setInterval(function(){
		setUploadSuccess(false);
	}, 100);

	return (
		<div className="container-fluid custom__container">
			<div className="row">
				<div className="col-xl-3 col-lg-3 col-md-5 col-sm-2"
					id="sidebar__col">
					<Sidebar
					/>
				</div>

				<Switch>
					<Route exact path={`/`}>
						<div className={`col-xl-5 col-lg-5 
							col-md-7 col-sm-10 col-12`}
							id="content_col">
							<CreatePostCard
								token={token}
								devApi={devApi}
								current_user={current_user}
								success={callSuccessFunction}
							/>
							{
								upload_success?
								<>
									<div className="success_card">
										<p>
											Your Post was successfully 
												Uploaded🎉🎇🎊✨
										</p>
									</div>
									<br />
								</>:''
							}
							<PostContent
								posts={posts}
								devURL={devURL}
								current_user={current_user}
								token={token}
								devApi={devApi}
							/>
						</div>
						<div className="col-xl-4 col-lg-4"
							id="rightbar_col">
							<SuggestionCard />
						</div>
					</Route>
					<Route path={`/user/:username`}>
						<Profile
							devApi={devApi}
							devURL={devURL}
							token={token}
							current_user={current_user}
							posts={posts}
						/>
					</Route>
					<Route path={`/p/:id`}>
						<SinglePostSection
							devApi={devApi}
							devURL={devURL}
							token={token}
							current_user={current_user}
						/>
					</Route>
					<Route path={`/explore`}>
						<Explore
							devApi={devApi}
							devURL={devURL}
							token={token}
							current_user={current_user}
							posts={posts}
						/>
					</Route>
				</Switch>
			</div>
		</div>
	)
}

export default Home