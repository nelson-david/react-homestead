import AvatarImg from "../../assets/img/main1.jpg";
import PostImgCarousel from "./PostImgCarousel";
import MiniProfile from "./MiniProfile";
import "../../assets/css/post.css";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import PostFooter from "../../components/navigation/PostFooter";
import PostTextData from "../../components/misc/PostTextData";
import Moment from 'react-moment';


const SinglePost = ({value, devURL, current_user, token, devApi}) => {

	const [body, setBody] = useState(null);
	const [showMiniProfile, setShowMiniProfile] = useState(false);

	useEffect(() => {
		var __data = value.body;
		__data = __data.replace(/(^|\W)(#[a-z\d][\w-]*)/ig,
			'$1<a class="hightlight_text" href="/tags/$2">$2</a>');
		__data = __data.replace(/(^|\W)(@[a-z\d][\w-]*)/ig,
			'$1<a class="hightlight_text" href="/profile/$2">$2</a>');
		setBody(__data);
	}, [value]);

	const toggleMiniProfile = (e) => {
		e.preventDefault();
		setShowMiniProfile(!showMiniProfile);
	}

	return (
		<>
			<div className="card post_card">
				<div className="header">
					<Link to={`/profile/${value.author_data._id}/`}>
						<img
							src={AvatarImg}
							alt="postAuthorImg"
							onClick={toggleMiniProfile}
						/>
						<span className="username">
							@{value.author_data.username}
						</span>
					</Link>
					{
						showMiniProfile?
						<MiniProfile
							user_data={value.author_data}
							toggleMiniProfile={toggleMiniProfile}
						/>
						: ''
					}
					<i id="upload_time">
						<Moment fromNow>{value.date_added}</Moment>
					</i>
				</div>
				<div className="body">
					{
						value.body.length > 0?
						<PostTextData
							body={body !== null?body:''}
						/>
						:''
					}
					{
						value.image.length > 0 ?
						<PostImgCarousel
							imageData={value.image}
							devURL={devURL}
							height="550px"
						/>
						:''
					}
				</div>
				<PostFooter
					post={value}
					current_user={current_user}
					token={token}
					devApi={devApi}
				/>
			</div>
			<hr />
		</>
	)
}

export default SinglePost;