import Moment from "react-moment";
import {Link} from "react-router-dom";
import * as RiIcons from "react-icons/ri";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as TiIcons from "react-icons/ti";
import * as HiIcons from "react-icons/hi";


const ProfileSidebarCard = ({user, current_user}) => {
	// const convert_date = (current_date) => {
	// 	const dbDate = new Date(current_date);
	// 	return new Intl.DateTimeFormat('en-GB', 
	// 		{dateStyle: 'full', timeStyle:'short'}).format(dbDate);
	// }

	return (
		<>
		<div className="card profile__sidebarcard">
			<div className="header">
				<p>{user.username}'s Information</p>
			</div>
			<div className="body">
				<ul>
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
				{
					current_user.username === user.username?
					<Link
						to="/edit/profile/settings"
						className="edit__link"
					>
						<TiIcons.TiEdit />
						Edit This Details</Link>
					:
					<Link
						to="/edit/profile/settings"
						className="edit__link"
						onClick={(e) => e.preventDefault()}
					>Not My Details</Link>
				}
			</div>
		</div>
		</>
	)
}

export default ProfileSidebarCard;