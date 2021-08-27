import {useState, useEffect} from "react";
import {Switch, Route, Link} from "react-router-dom";
import '../../assets/css/editprofile.css';
//import CoverPhoto from '../../assets/img/main3.jpg';

import * as BiIcons from "react-icons/bi";
import * as VscIcons from "react-icons/vsc";
// import * as MdIcons from "react-icons/md";
import * as ImIcons from "react-icons/im";
import * as FaIcons from "react-icons/fa";

import axios from "axios";

const EditProfile = ({current_user, devApi, devURL, token}) => {
	return (
		<>
			<div className={`col-xl-6 col-lg-6 
				col-md-7 col-sm-10 col-12`}
				id="content_col">
				<div className="card editprofile__nav">
					<ul>
						<li>
							<Link to="/settings" className="active">
								<BiIcons.BiCog />
							</Link>
						</li>
						<li>
							<Link to="/settings/security">
								<BiIcons.BiShieldQuarter />
							</Link>
						</li>
						<li>
							<Link to="/settings/privacy">
								<BiIcons.BiLockAlt />
							</Link>
						</li>
						<li>
							<Link to="/settings/pushnotifications">
								<VscIcons.VscBell />
							</Link>
						</li>
						<li>
							<Link to="/settings/location">
								<BiIcons.BiMap />
							</Link>
						</li>
						<li>
							<Link to="/settings/settings">
								<FaIcons.FaLanguage />
							</Link>
						</li>
					</ul>
				</div>


				<br />
				<div className="card editprofile__card">
					<Switch>
						<Route exact path={`/settings`}>
							<MainRoute
								current_user={current_user}
								devApi={devApi}
								token={token}
								devURL={devURL}
							/>
						</Route>
						<Route path={`/settings/security`}>
							<h1>Settings Route</h1>
						</Route>
					</Switch>
				</div>
			</div>
		</>
	)
}

const MainRoute = ({current_user, devApi, token, devURL}) => {

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [dob, setDob] = useState();
	const [gender, setGender] = useState(current_user?current_user.gender:"");
	const [bio, setBio] = useState("");

	const [profileImg, setProfileImg] = useState({});
	const [coverImg, setCoverImg] = useState({});

	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (current_user){
			setUsername(current_user.username);
			setEmail(current_user.email);
			setDob(current_user.dob);
			setGender(current_user.gender);
			setBio(current_user.bio);
			setProfileImg({
				file: `${current_user.profile_picture==="default.webp" ?
					'https://images.alphacoders.com/781/78163.jpg'
					:`${devURL}img/profile_photo/${current_user.profile_picture}`}`
			})
			setCoverImg({
				file: `${current_user.cover_photo==="cover_default.webp" ?
					'https://images.alphacoders.com/781/78163.jpg'
					:`${devURL}img/cover_photo/${current_user.cover_photo}`}`
			})
		}
	}, [current_user, devURL])

	const saveProfile = (e) => {
		e.preventDefault();
		setSaving(true);

		var form_data = new FormData();
		form_data.append("cover_photo", coverImg.data);
		form_data.append("profile_photo", profileImg.data);

		form_data.append("username", username);
		form_data.append("email", email);
		form_data.append("dob", dob);
		form_data.append("gender", gender);
		form_data.append("bio", bio);

		axios({
			method: 'POST',
			url: `${devApi}user/${current_user.username}/settings/general/`,
			data: form_data,
			headers: {
				'Authorization': token
			}
		}).then((res) => {
			setSaving(false);
			console.log(res.data);
		});

	}

	const handleFileChange = (e) => {
		const field = e.target.dataset.input;
		if (field === "profile"){
			setProfileImg({
				file: URL.createObjectURL(e.target.files[0]),
				data: e.target.files[0]
			})
		}
		if (field === "cover"){
			setCoverImg({
				file: URL.createObjectURL(e.target.files[0]),
				data: e.target.files[0]
			})
		}
	}

	return (
		<div className="tab1">
			<form className="editprofile__form" onSubmit={saveProfile}>
				<span>Click on the images to change them</span>

				<>
					<label
						htmlFor="cover_picturefield"
						id="editprofile__coverphotolabel"
					>
						<img
							alt="coverphoto"
							src={coverImg.file}
							className="editprofile__coverphoto"
						/>
					</label>
					<input
						type="file"
						id="cover_picturefield"
						hidden={true}
						data-input="cover"
						onChange={handleFileChange}
					/>
				</>

				<>
					<label
						htmlFor="profile_picturefield"
						id="editprofile__profilephotolabel"
					>
						<img
							alt="coverphoto"
							src={profileImg.file}
							className="editprofile__profilephoto"
						/>
					</label>
					<input
						type="file"
						id="profile_picturefield"
						hidden={true}
						data-input="profile"
						onChange={handleFileChange}
					/>
				</>


				<br />
				<br />
				<div>
					<div className="row">
						<div className="form-group col-md-6 edit__profileinputcol">
							<div>
								<label htmlFor="editprofile_username">
									Username: </label>
								<input
									type="text"
									placeholder="Username"
									className="form-control editprofile__input"
									value={username}
									required={true}
									onChange={(e) => setUsername(e.target.value)}
									id="editprofile_username"
								/>
							</div>
						</div>

						<div className="form-group col-md-6
							edit__profileinputcol">
							<div>
								<label htmlFor="editprofile_email">Email: </label>
								<input
									type="email"
									placeholder="Email"
									className="form-control editprofile__input"
									value={email}
									required={true}
									onChange={(e) => setEmail(e.target.value)}
									id="editprofile_email"
								/>
							</div>
						</div>

						<div className="form-group col-md-6 edit__profileinputcol">
							<div>
								<label htmlFor="editprofile_dob">Birthday: </label>
								<input
									type="date"
									className="form-control editprofile__input"
									value={new Date(dob).toLocaleDateString('en-CA')}
									onChange={(e) => setDob(e.target.value)}
									id="editprofile_dob"
								/>
							</div>
						</div>

						<div className="form-group col-md-6
							edit__profileinputcol">
							<div>
								<label htmlFor="editprofile_gender">
									Gender: </label>
								<select
									className="form-control editprofile__input"
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									id="editprofile_gender"
								>
									<option>
										Select Your Gender
									</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</div>
						</div>

						<div className="form-group col-md-12
							edit__profileinputcol">
							<label htmlFor="editprofile_gender">
								Bio: </label>
							<textarea
								className="form-control editprofile__input"
								rows="4"
								value={bio}
								onChange={(e) => setBio(e.target.value)}
							>
							</textarea>
						</div>

					</div>
					<button
						id="saveprofile__button"
						disabled={saving}
					>
						{
							saving?
							<ImIcons.ImSpinner2 />
							:'Save Changes'
						}
					</button>
				</div>
			</form>
		</div>
	)
}

export default EditProfile;