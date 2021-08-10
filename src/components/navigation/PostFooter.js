import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import {useRef, useState, useEffect} from "react";
import axios from "axios";
import Modal from 'react-modal';

const PostFooter = ({post, current_user, token, _id, devApi, nullComment, devURL}) => {

	const likeButtonRef = useRef();
	const [liked, setLiked] = useState(null);
	const [modal, setModal] = useState(false);
	const [copySuccess, setCopySuccess] = useState(false)

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
			setLiked(true);
            axios({
                method: 'PUT',
                url: `${devApi}post/${post._id}/likes/add/`,
                headers: {
                    'Authorization': token
                }
            }).then((res) => {
            });
		}else{
			setLiked(false);
            axios({
                method: 'PUT',
                url: `${devApi}post/${post._id}/likes/remove/`,
                headers: {
                    'Authorization': token
                }
            }).then((res) => {
            });	
		}
	}

	const toggleModal = (e) => {
		e.preventDefault();
		setModal(!modal);
	}

	return (
		<>
		{
			modal?
			<PostMoreModal
				toggleModal={toggleModal}
				post={post}
				devURL={devURL}
				setCopySuccess={setCopySuccess}
			/>:''
		}
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
					<Link to={`/p/${post._id}`} onClick={commentIconClick}>
						<AiIcons.AiOutlineMessage />
					</Link>
				</li>
				<li>
					<a href={`/more/${post._id}`}
						className="post_moreicon"
						onClick={toggleModal}
					>
						<BsIcons.BsChevronBarExpand />
					</a>
				</li>
			</ul>
		</div>
		{
			copySuccess?
			<div className="card w-100 fixed-bottom alert__card">
				<span>Link Copied Successfully</span>
			</div>:''
		}
		</>
	)
}

const PostMoreModal = ({toggleModal, post, devURL, setCopySuccess}) => {
	Modal.setAppElement('#root');

	const copyLink = (e) => {
		e.preventDefault();
		window.navigator.clipboard.writeText(`https://${devURL}p/${post._id}`);
		setCopySuccess(true);
		toggleModal(e);
		setTimeout(function(){
			setCopySuccess(false);
		}, 4000);
	}

	const following = (e) => {
		e.preventDefault();
		alert("Already Following");
	}

	return(
		<Modal
			isOpen={true}
			className="post_dropdownmodal"
			overlayClassName="overlay post_dropdown"
			closeTimeoutMS={1000000}
			onRequestClose={toggleModal}
		>
			<div className="body">
				<ul>
					<li>
						<Link
							to="/share"
							className="active"
						>
							<AiIcons.AiOutlineShareAlt />
							Share To
						</Link>
					</li>
					<li>
						<Link to="/share">
							<AiIcons.AiOutlineShareAlt />
							Report Post
						</Link>
					</li>
					<li>
						<Link
							to="/user/follow"
							onClick={following}
						>
							<AiIcons.AiOutlineShareAlt />
							Unfollow
						</Link>
					</li>
					<li>
						<Link
							to="/copy/link"
							onClick={copyLink}
						>
							<AiIcons.AiOutlineShareAlt />
							Copy Link
						</Link>
					</li>
					<li>
						<Link to="/share">
							<AiIcons.AiOutlineShareAlt />
							Embed
						</Link>
					</li>
					<li>
						<Link to="/share">
							<AiIcons.AiOutlineShareAlt />
							Cancel
						</Link>
					</li>
				</ul>
			</div>
		</Modal>
	)
}

export default PostFooter;