import ProfilePhoto from "../../assets/img/main1.jpg";
import {Link} from "react-router-dom";
import * as RiIcons from "react-icons/ri";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as HiIcons from "react-icons/hi";
import Moment from "react-moment";

const UserSearchCard = ({current_user, user, toggleSearchModal}) => {

	const following = (e) => {
		e.stopPropagation();
		e.preventDefault();
		console.log("went through");
	}

	const stopClosing = (e) => {
		e.preventDefault();
		e.stopPropagation();
	}

	return (
		<div
			className="card mb-3 user_searchcard"
			onClick={toggleSearchModal}
		>
			<Link
				to={`/user/${user.username}`}
				className="d-flex first"
			>
				<img
					src={ProfilePhoto}
					alt="profileImg"
				/>
				<div>
					<p>{user.username}</p>
					<ul onClick={stopClosing}>
						<li>
							<RiIcons.RiCalendarTodoLine />
							Joined: <Moment
								format="YYYY MMM DD"
							>{user.date_joined}</Moment> 
							(<Moment fromNow>{user.date_joined}</Moment>)
						</li>
						<li>
							<AiIcons.AiOutlineMail />
							Email: {user.email}
						</li>
						<li>
							<BiIcons.BiCurrentLocation />
							Location: Nigeria
						</li>
						<li>
							<HiIcons.HiOutlineUser />
							Gender: Male
						</li>
						<li>
							<HiIcons.HiOutlineCalendar />
							Date Of Birth: 24th June 2001
						</li>
					</ul>
				</div>
				{
					current_user._id === user._id?
					<button>
						<RiIcons.RiEditCircleLine />
						Profile
					</button>
					:
					<button onClick={following}>
						<RiIcons.RiUserFollowFill />
						Follow
					</button>
				}
			</Link>
		</div>
	)
}

export default UserSearchCard;