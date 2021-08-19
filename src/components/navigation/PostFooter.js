import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";
import * as RiIcons from "react-icons/ri";
import * as VscIcons from "react-icons/vsc";
import * as TiIcons from "react-icons/ti";

import {Link} from "react-router-dom";
import {useRef, useState, useEffect} from "react";
import axios from "axios";
import Modal from 'react-modal';

const PostFooter = ({post, current_user, token, devApi,
	nullComment, devURL, reloadPost}) => {

	const likeButtonRef = useRef();
	const [liked, setLiked] = useState(null);

	const [modal, setModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const [copySuccess, setCopySuccess] = useState(false);
	const [deleteSuccess, setDeleteSuccess] = useState(false);

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
	const toggleDeleteModal = (e) => {
		e.preventDefault();
		setDeleteModal(!deleteModal);
	}

	return (
		<>
		{
			modal?
			<PostMoreModal
				toggleModal={toggleModal}
				toggleDeleteModal={toggleDeleteModal}
				post={post}
				devURL={devURL}
				current_user={current_user}
				setCopySuccess={setCopySuccess}
			/>:''
		}
		{
			deleteModal?
			<DeleteModal
				post={post}
				toggleDeleteModal={toggleDeleteModal}
				devApi={devApi}
				token={token}
				reloadPost={reloadPost}
				setDeleteSuccess={setDeleteSuccess}
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
		{
			deleteSuccess?
			<div className="card w-100 fixed-bottom alert__card">
				<span>Post Successfully Deleted</span>
			</div>:''
		}
		</>
	)
}

const PostMoreModal = ({toggleModal, post, devURL, setCopySuccess,
	current_user, toggleDeleteModal}) => {
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
	}

	const callDeletePostModal = (e) => {
		e.preventDefault();
		toggleModal(e);
		toggleDeleteModal(e);
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
				<p>More Post Options</p>
				<ul>
					{
						post.author_data._id === current_user._id?
						<>
							<li>
								<Link to="/share">
									<RiIcons.RiEditCircleLine />
									Edit Post
								</Link>
							</li>
							<li>
								<Link
									to="/delete/post"
									onClick={callDeletePostModal}
								>
									<RiIcons.RiDeleteBin5Line />
									Delete Post
								</Link>
							</li>
						</>
						:''
					}
					<li>
						<Link
							to="/share"
						>
							<BsIcons.BsBookmark />
							Save Post
						</Link>
					</li>
					<li>
						<Link
							to="/share"
						>
							<AiIcons.AiOutlineShareAlt />
							Share To
						</Link>
					</li>
					<li>
						<Link to="/share">
							<VscIcons.VscReport />
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
							<RiIcons.RiFileCopyLine />
							Copy Link
						</Link>
					</li>
					<li>
						<Link to="/share">
							<BsIcons.BsCodeSlash />
							Embed
						</Link>
					</li>
					<li>
						<Link
							to="/cancel"
							onClick={toggleModal}
						>
							<TiIcons.TiCancelOutline />
							Cancel
						</Link>
					</li>
				</ul>
			</div>
		</Modal>
	)
}

const DeleteModal = ({toggleDeleteModal, post, devApi, token,
	reloadPost, setDeleteSuccess}) => {

	const [deleting, setDeleting] = useState(false);

	const deletePost = (e) => {
		setDeleting(true);
		axios({
			method: 'DELETE',
			url: `${devApi}post/${post._id}/delete/`,
			headers: {
				'Authorization': token
			}
		}).then((res) => {
			if (res.data.message === "success"){
				setDeleteSuccess(true);
				reloadPost();
				toggleDeleteModal(e);
				setTimeout(function(){
					setDeleteSuccess(false);
				}, 4000);
			}
		});
	}

	return (
		<Modal
			isOpen={true}
			className="post_deletemodal"
			overlayClassName="overlay post_deleteoverlay"
			closeTimeoutMS={1000000}
			onRequestClose={toggleDeleteModal}
		>
			<div className="body">
				<p>Are You Sure You Want To Delete 
					This Post ?</p>
				<div className="d-flex first">
					<button
						onClick={toggleDeleteModal}
					>No</button>
					<button
						onClick={deletePost}
					>{
						deleting?
						<ImIcons.ImSpinner2 />
						:'Yes'
					}</button>
				</div>
			</div>
		</Modal>
	)
}

export default PostFooter;