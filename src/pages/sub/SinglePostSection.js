import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import AvatarImg from "../../assets/img/main1.jpg";
import PostImgCarousel from "../../components/sub/PostImgCarousel";
import CommentCard from "../../components/card/CommentCard";
import PostFooter from "../../components/navigation/PostFooter";
import PostTextData from "../../components/misc/PostTextData";
import Moment from 'react-moment';

const SinglePostSection = ({devApi, devURL, token, current_user}) => {

	const [post, setPost] = useState({});
	const [body, setBody] = useState(null);

	useEffect(() => {
        if (token){
        	const _id = window.location.pathname.split("/")[2];
            axios({
                method: 'GET',
                url: `${devApi}post/${_id}/get/`,
                headers: {
                    'Authorization': token
                }
            }).then((res) => {
            	setPost(res.data.post);
				var __data = res.data.post.body;
				__data = __data.replace(/(^|\W)(#[a-z\d][\w-]*)/ig,
					'$1<a class="hightlight_text" href="/tags/$2">$2</a>');
				__data = __data.replace(/(^|\W)(@[a-z\d][\w-]*)/ig,
					'$1<a class="hightlight_text" href="/profile/$2">$2</a>');
				setBody(__data);
            });
        }
	}, [devApi, token, post]);

	return (
		<>
			{
				Object.keys(post).length === 0?
				<h1>Loading</h1>
				:
				<>
					<div className={`col-xl-5 col-lg-5 
						col-md-7 col-sm-10 col-12`}
						id="content_col">
						<div className="card post_card">
							<div className="header">
								<Link to={`/profile/${post.author_data._id}/`}>
									<img
										src={AvatarImg}
										alt="postAuthorImg"
									/>
									<span className="username">
										@{post.author_data.username}
									</span>
								</Link>
								<i id="upload_time">
									<Moment fromNow>{post.date_added}</Moment>
								</i>
							</div>
							<div className="body">
								{
									post.image.length > 0 ?
									<PostImgCarousel
										imageData={post.image}
										devURL={devURL}
									/>
									:''
								}
								{
									post.body.length > 0?
									<PostTextData
										body={body !== null?body:''}
										toggle={false}
										style={{
											marginTop:"5px",
											marginBottom:"0px"
										}}
									/>
									:''
								}
							</div>
							<PostFooter
								post={post}
								current_user={current_user}
								token={token}
								devApi={devApi}
								nullComment={true}
							/>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4"
						id="rightbar_col">
						<CommentCard
							token={token}
							devApi={devApi}
							__id={window.location.pathname.split("/")[2]}
							current_user={current_user}
						/>
					</div>
				</>
			}
		</>
	)
}

export default SinglePostSection;