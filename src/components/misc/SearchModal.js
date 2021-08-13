import Modal from "react-modal";
import "../../assets/css/search.css";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
import SinglePost from "../sub/SinglePost";
import UserSearchCard from "./UserSearchCard";

import {useState} from "react";

const SearchModal = ({toggleSearchModal, token, devApi, devURL,
	current_user, reloadPost}) => {

	const [searchText, setSearchText] = useState("");
	const [tabs, setTabs] = useState("post");

	const [posts, setPosts] = useState(null);
	const [users, setUsers] = useState(null);

	const searchData = (e) => {
		e.preventDefault();
		if (searchText.length < 2){
			console.log("Small...")
		}else{
			axios({
				method: 'GET',
				url: `${devApi}search/${searchText}/`,
				headers: {
					'Authorization': token
				}
			}).then((res) => {
				setPosts(res.data.post_data);
				setUsers(res.data.user_data);
			});
		}
	}

	const switchTabs = (e) => {
		e.preventDefault();
		setTabs(e.target.dataset.tab);
	}

	Modal.setAppElement('#root');
	return (
		<Modal
			isOpen={true}
			className="search_modal"
			overlayClassName="overlay search_modaloverlay"
			onRequestClose={toggleSearchModal}
			style={{
				zIndex: "1000"
			}}
		>
			<div className="header">
				<form onSubmit={searchData}>
					<div
						className="form-group d-flex">
						<input
							type="search"
							className="form-control 
								form-control-lg search__input"
							placeholder="Enter Search Here..."
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
						<button id="search_button">
							<BsIcons.BsSearch />
						</button>
					</div>
				</form>
			</div>
			<div className="body">
				<ul className="tabs">
					<li>
						<a
							href="/home"
							className="active"
							onClick={switchTabs}
							data-tab="post"
						>
							<CgIcons.CgFeed
								data-tab="soulmate"
							/>
							Posts
						</a>
					</li>
					<li>
						<a
							href="/soulmate"
							onClick={switchTabs}
							data-tab="soulmate"
						>
							<AiIcons.AiOutlineUser
								data-tab="soulmate"
							/>
							Soulmate
						</a>
					</li>
					<li>
						<a href="/home">
							<BsIcons.BsHash />
							Hashtags
						</a>
					</li>
					<li>
						<a href="/home">
							<AiIcons.AiOutlineFire />
							Hot
						</a>
					</li>
				</ul>

				{
					tabs === "post"?
					<PostsTab
						posts={posts}
						current_user={current_user}
						devURL={devURL}
						token={token}
						devApi={devApi}
						reloadPost={reloadPost}
						toggleSearchModal={toggleSearchModal}
					/>:''
				}
				{
					tabs === "soulmate"?
					<UsersTab
						users={users}
						current_user={current_user}
						devURL={devURL}
						token={token}
						devApi={devApi}
						reloadPost={reloadPost}
						toggleSearchModal={toggleSearchModal}
					/>:''
				}


			</div>
		</Modal>
	)
}

const PostsTab = ({posts, token, devApi, devURL,
	current_user, reloadPost, toggleSearchModal}) => {
	return (
		<div className="search__posttabs">
			{
				posts !== null?
				<>
					{
						posts.map((value, index) => {
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
						})
					}
				</>:''
			}
		</div>
	)
}

const UsersTab = ({users, token, devApi, devURL,
	current_user, reloadPost, toggleSearchModal}) => {
	return (
		<div className="search__posttabs">
			{
				users !== null?
				<>
					{
						users.map((value, index) => {
							return (
								<UserSearchCard
									key={index}
									current_user={current_user}
									user={value}
									toggleSearchModal={toggleSearchModal}
								/>
							)
						})
					}
				</>:''
			}
		</div>
	)
}

export default SearchModal;