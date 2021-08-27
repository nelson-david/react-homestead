import { useEffect } from "react";
import PostLoader from "../../components/misc/PostLoader";
import SinglePost from "../../components/sub/SinglePost";

const PostContent = ({posts, devURL, current_user, token, devApi,
	reloadPost, loadingPosts, setCurrentComponent}) => {

	useEffect(() => {
		setCurrentComponent("home");
	}, [setCurrentComponent])

	return (
		<div className="post_container">
			<br />
			{
				loadingPosts?
				<PostLoader />
				:
				<>
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
								reloadPost={reloadPost}
							/>
						)
					}):''
				}
				</>
			}
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	)
}

export default PostContent;