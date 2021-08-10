import {Link, Switch, Route} from "react-router-dom";
import SinglePost from "../../components/sub/SinglePost";

const Explore = ({posts, devURL, current_user, token, devApi}) => {
	return (
		<div className={`col-xl-5 col-lg-5 
			col-md-7 col-sm-10 col-12`}
			id="content_col">
			<TrendingScrollCard />
			<br />


			<Switch>
				<Route exact path={`/explore`}>
					{
						posts.length !== 0?posts.map((value, index) => {
							return (
								<SinglePost
									key={index}
									value={value}
									devURL={devURL}
									token={token}
									current_user={current_user}
									devApi={devApi}
								/>
							)
						}):''
					}
				</Route>
				<Route path={`/explore/videos`}>
					<div className="card p-3 ">
						<h1>Hello Videos Application</h1>
					</div>
				</Route>
				<Route path={`/explore/hashtags`}>
					<div className="card p-3 ">
						<h1>Hello Hashtags Application</h1>
					</div>
				</Route>
				<Route path={`/explore/picks`}>
					<div className="card p-3 ">
						<h1>Hello Picks Application</h1>
					</div>
				</Route>
			</Switch>

		</div>
	)
}

const navContents = [
	{
		text: "Posts",
		className: "active",
	},
	{
		text: "Videos",
		link: "videos"
	},
	{
		text: "Hashtags",
		link: "hashtags"
	},
	{
		text: "Best Picks",
		link: "picks"
	}
]

const TrendingScrollCard = () => {
	return(
		<div
			className="trending_scroll d-flex justify-content-center"
		>
			{
				navContents.map((value, index) => {
					return(
						<Link
							to={`/explore${value.link!==undefined?`/${value.link}`:''}`}
							className={`${value.className}`}
							key={index}
						>
							{value.text}
						</Link>
					)
				})
			}
		</div>
	)
}

export default Explore;