import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import AvatarImg from "../../assets/img/main1.jpg";
import PostImgCarousel from "../../components/sub/PostImgCarousel";
import CommentCard from "../../components/card/CommentCard";
import PostFooter from "../../components/navigation/PostFooter";
import PostTextData from "../../components/misc/PostTextData";
import NotFoundDiv from "../../components/misc/NotFoundDiv";
import LoadingDiv from "../../components/misc/LoadingDiv";
import Moment from 'react-moment';
import * as AiIcons from "react-icons/ai";

const SinglePostSection = ({devApi, devURL, token, current_user,
	reloadPost, setCurrentComponent}) => {

	const [post, setPost] = useState({});
	const [body, setBody] = useState(null);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(true);
	const _id = window.location.pathname.split("/")[2];

	useEffect(() => {
		setCurrentComponent("single_post");
		
		axios({
			method: 'GET',
			url: `${devApi}post/${_id}/get/`,
			headers: {
				'Authorization': token
			}
		}).then((res) => {
			if (res.data.message !== false){
				setPost(res.data.post);
				var __data = res.data.post.body;
				__data = __data.replace(/(^|\W)(#[a-z\d][\w-]*)/ig,
					'$1<a class="hightlight_text" href="/tags/$2">$2</a>');
				__data = __data.replace(/(^|\W)(@[a-z\d][\w-]*)/ig,
					'$1<a class="hightlight_text" href="/profile/$2">$2</a>');
				setBody(__data);
			}else{
				setNotFound(true)
			}
			setLoading(false);
		});
	}, [devApi, token, _id, setCurrentComponent]);

	return (
		<>
			{
				loading?
				<div className={`col-xl-5 col-lg-5 
					col-md-7 col-sm-10 col-12`}
					id="content_col">
					<LoadingDiv />
				</div>
				:
				<>
				{
					notFound === true?
					<NotFoundDiv
						text="This Page is Not Available, Post Was Deleted"
						style={{
							color: "lightgrey",
							fontFamily: "var(--arima)",
							fontSize: "23px",
							paddingLeft: "20px",
							paddingRight: "20px",
							paddingTop: "10px"
						}}
					/>
					:
					<>
						<div className={`col-xl-5 col-lg-5 
							col-md-7 col-sm-7 col-12`}
							id="content_col">
							<div className="card post_card" id="singlepost_card">
								<div className="header">
									<Link to={`/user/${post.author_data.username}/`}>
										<img
											src={AvatarImg}
											alt="postAuthorImg"
										/>
										<span className="username">
											@{post.author_data.username}
											{
												post.author_data.verified === true?
												<AiIcons.AiFillCheckCircle
													className="verified"
												/>:''
											}
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
									devURL={devURL}
									nullComment={true}
									reloadPost={reloadPost}
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
			}
		</>
	)
}

export default SinglePostSection;