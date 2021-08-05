import * as BiIcons from "react-icons/bi";
//import * as GoIcons from "react-icons/go";
import * as BsIcons from "react-icons/bs";
import * as ImIcons from "react-icons/im";
import * as VscIcons from "react-icons/vsc";
import {useState, useRef, useEffect} from "react";
import axios from "axios";
import AvatarImg from "../../assets/img/main1.jpg";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import LoadingDiv from "../misc/LoadingDiv";

const CommentCard = ({token, devApi, __id, current_user}) => {

	const [loading, setLoading] = useState(true);
	const commentInputRef = useRef();
	const commentDivRef = useRef(null);
	const [addingComment, setAddingComment] = useState(false);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		axios({
		    method: 'GET',
			url: `${devApi}post/${__id}/comment/get/`,
			headers: {
				'Authorization': token
			}
		}).then((res) => {
			setComments(res.data.comments);
			setLoading(false);
		});
		if (commentDivRef) {
			commentDivRef.current.addEventListener('DOMNodeInserted', event => {
				const { currentTarget: target } = event;
				target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
			});
		}
	}, [devApi, token]);

	const addComment = (e) => {
		e.preventDefault();
		setAddingComment(true);
		const __data = commentInputRef.current.innerText;
		axios({
			method: 'PUT',
			url: `${devApi}post/${__id}/comment/add/`,
			data: {text:__data},
			headers: {
				'Authorization': token
			}
		}).then((res) => {
			commentInputRef.current.innerText = "";
			if (res.data.message === "success"){
				setComments(res.data.comments);
				setAddingComment(false);
			}
		});
	}

	return (
		<>
			<div className="card singlepost comment_card">
				<div className="header_div">
					<p>Comments: {comments.length !== 0 ? comments.length:''}  </p>
				</div>
				<div
					className="body_div comment_bodydiv"
					id="comment_bodydiv_two"
					ref={commentDivRef}
				>
					{
						loading?
						<LoadingDiv />
						:
						<>
						{
							comments.length === 0?
							<span id="no_comments">
								<i>No Comments Yet</i>
								<br />
								Be The First To Comment On This Post
								<br />
								<VscIcons.VscCommentDiscussion />
							</span>
							:
							<>
								{
									comments.map((value, index) => {
										return(
											<CommentBody
												key={index}
												value={value}
												token={token}
												__id={__id}
												devApi={devApi}
												current_user={current_user}
											/>
										)
									})
								}
							</>
						}
						</>
					}
				</div>
				<div className="footer_div">
					<form id="comment_form" className="comment_form">
						<div className="first">
							<span
								contentEditable="true"
								data-placeholder="Leave a comment..."
								id="comment_input"
								ref={commentInputRef}
								className="comment_input">
							</span>
							<button
								type="button"
								id="comment_button"
								onClick={addComment}
							>
								{
									addingComment?
									<ImIcons.ImSpinner2 className="svg" />
									:
									<BiIcons.BiCommentAdd />
								}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

const CommentBody = ({value, token, devApi, __id, current_user}) => {

	const [likedComment, setLikedComment] = useState(false);

	useEffect(() => {
		if (value.likes.length === 0){
			setLikedComment(false);
		}else{
			setLikedComment(true);
			value.likes.map((check, index) => {
				if (check.liker_data._id === current_user._id){

				}
				return "Done";
			})
		}
	}, [value, current_user._id])

	const likeComment = (e) => {
		e.preventDefault();
		if (likedComment === true){
			setLikedComment(false);
		}else{
			axios({
				method: 'PUT',
				url: `${devApi}post/${__id}/comment/${value.comment_id}/like/`,
				headers: {
					'Authorization': token
				}
			}).then((res) => {
				if (res.data.message === "success"){
					setLikedComment(true);
				}
			});
		}
	}

	return (
		<>
		<div className="comment comment_card">
			<div className="header">
				<Link to={`/profile/${value.author_data._id}`}>
					<img
						src={AvatarImg}
						alt="postAuthorImg"
					/>
					<span className="first"><i>@</i>
						{value.author_data.username}
					</span>
				</Link>
				<span
					className="second comment_dropdown"
					onClick={likeComment}
				>
					{
						likedComment === false?
						<BsIcons.BsHeart />
						:
						<BsIcons.BsHeartFill />
					}
				</span>
			</div>
			<div className="body">
				<p>{value.body}</p>
			</div>
			<div className="footer">
				<i>
					<Moment fromNow>{value.date_added}</Moment>
				</i>
			</div>
		</div>
		</>
	)
}

export default CommentCard;