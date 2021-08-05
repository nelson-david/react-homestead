import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import {useRef, useState, useEffect} from "react";
import axios from "axios";

const PostFooter = ({post, current_user, token, _id, devApi, nullComment}) => {

	const likeButtonRef = useRef();
	const [liked, setLiked] = useState(null);

	useEffect(() => {
		if (post.likes.length === 0){
			setLiked(false);
		}else{
			post.likes.map((value, index) => {
				if (value.liker_data._id === current_user._id){
					setLiked(true);
				}
				return "Done";
			});
		}
	}, [current_user, post]);

	const commentIconClick = (e) => {
		if (nullComment === true){
			e.preventDefault();
		}
	}

	const like_post = (e) => {
		e.preventDefault();
		if (liked === false){
            axios({
                method: 'PUT',
                url: `${devApi}post/${post._id}/likes/add/`,
                headers: {
                    'Authorization': token
                }
            }).then((res) => {
            	setLiked(true);
            });
		}else{
            axios({
                method: 'PUT',
                url: `${devApi}post/${post._id}/likes/remove/`,
                headers: {
                    'Authorization': token
                }
            }).then((res) => {
            	setLiked(false);
            });	
		}
	}

	return (
		<div className="footer">
			<ul id="footer_list">
				<li>
					<a
						href={`/like/${post._id}`}
						className="like_unlike_button"
						ref={likeButtonRef}
						onClick={like_post}
					>
						{
							liked?
							<BsIcons.BsHeartFill />
							:
							<BsIcons.BsHeart />
						}
					</a>
				</li>
				<li>
					<Link to={`/post/${post._id}`} onClick={commentIconClick}>
						<AiIcons.AiOutlineMessage />
					</Link>
				</li>
				<li>
					<a href={`/dropdown/${post._id}`}
						className="post_moreicon">
						<BsIcons.BsChevronBarExpand />
					</a>
				</li>
			</ul>
		</div>
	)
}

export default PostFooter;