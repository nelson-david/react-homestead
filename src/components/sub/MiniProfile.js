import AvatarImg from "../../assets/img/main1.jpg";
import * as MdIcons from "react-icons/md";
import Moment from 'react-moment';

const MiniProfile = ({user_data, toggleMiniProfile}) => {
  return (
    <div className="dropdown mini__profile">
      <div className="dropdown-menu"
        id="mini__profile"
      >
        <div className="d-flex body">
          <img
            src={AvatarImg}
            alt="secImg"
            loading="lazy"
          />
          <div className="content">
            <MdIcons.MdCancel
              onClick={toggleMiniProfile}
            />
            <p>
              <a href={`/profile/${user_data._id}`}>
                <span className="user_name">
                  @{user_data.username}
                </span>
              </a>
            </p>
            <div className="data_one">
              <span>Joined: 
                <Moment
                  date={String(user_data.date_joined.slice(0,5))}
                />
              </span>
              <span>Location: Nigeria</span>
            </div>

            <div className="data_two">
              <span>
                Followers: {user_data.followers.length}
              </span>
              <span>
                Following: {user_data.followed.length}
              </span>

              <br />
              <button
                type="button"
                className="float-right follow_button"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniProfile;
