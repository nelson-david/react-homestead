//import {useState} from "react";
import SinglePost from "../../components/sub/SinglePost";

const PostContent = ({posts, devURL, current_user, token, devApi,
	reloadPost}) => {

	return (
		<div className="post_container">
			<br />
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