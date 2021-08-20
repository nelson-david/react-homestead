import {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import '../assets/css/auth.css';
import LoginImg from "../assets/img/auth1.png";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import * as BsIcons from "react-icons/bs";

const Register = ({setCurrentComponent, devApi}) => {

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [dob, setDob] = useState("");

	const [proccess, setProccess] = useState(false);
	const [acctError, setAcctError] = useState(false);
	const [ageError, setAgeError] = useState(false);
	const [done, setDone] = useState(false);
	const [passwordType, setPasswordType] = useState("password");

	useEffect(() => {
		setCurrentComponent();
	}, [setCurrentComponent]);

	const toggleShowPassword = (e) => {
		e.preventDefault();
		if (passwordType === "password"){
			setPasswordType("text");
		}
		if (passwordType === "text"){
			setPasswordType("password");
		}
	}

	const handleRegister = (e) => {
		e.preventDefault();

		const age = parseInt(String(new Date()).split(' ')[3]) - 
			parseInt(String(dob).slice(0,4));

		if (age < 18){
			setAgeError(true);
		}else{
			setProccess(true);
			axios({
				method:"POST",
				data: {
					email, username, password, dob, age
				},
				url: `${devApi}auth/register/`,
			}).then((res) => {
				setUsername("");
				setPassword("");
				setEmail("");
				setDob("");
				setProccess(false);
				if (res.status === 200){
					setDone(true)
				}else{
					if (res.status === 400) {
						setAcctError(true);
					}
				}
			});
		}
	}

	return (
		<>
		{
			done ?
			<Redirect to="/login" />
			:
			<div className="container-fluid">
				<br />
				<div className="row d-flex justify-content-center"
					id="auth__row">
					<div className="col-xl-5 col-lg-6 col-md-6"
						id="auth__imgcol">
						<img
							src={LoginImg}
							alt="authImg"
							className="img-fluid"
						/>
					</div>
					<div className="col-xl-6 col-xl-6 col-md-6 col-sm-8"
						id="auth__cardcol">
						<div className="card auth__card">
							<div id="error_div">
								{
									acctError?
									<div className="alert danger_alert">
										Invalid Username Or Password
										<i onClick={() => setAcctError(false)}>
											<TiIcons.TiTimes />
										</i>
									</div>
									:
									<>
									{
										ageError?
										<div className="alert danger_alert">
											Your Age Is Below 18
											<i onClick={() => setAgeError(false)}>
												<TiIcons.TiTimes />
											</i>
										</div>
										:''
									}
									</>
								}
							</div>
							<p id="auth__legend">Create An Account!</p>

							<form id="signin_form" onSubmit={handleRegister}>
								<div className="row">
									<div className="col-sm-6 form-group auth_group">
										<input
											type="email"
											name="auth_email"
											placeholder="Email Address"
											className="form-control auth__input"
											id="signup_email"
											required={true}
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className="col-sm-6 form-group auth_group">
										<input
											type="text"
											name="auth_username"
											placeholder="Username"
											className="form-control auth__input"
											id="signup_username"
											required={true}
											value={username}
											onChange={(e) => setUsername(e.target.value)}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6 form-group auth_group">
										<input
											type="date"
											name="auth_dob"
											className="form-control auth__input"
											id="signup_dob"
											required={true}
											value={dob}
											onChange={(e) => setDob(e.target.value)}
										/>
									</div>
									<div className="col-sm-6 form-group auth_group">
										<div className="d-flex">
											<input
												type={passwordType}
												name="auth_password"
												placeholder="Password"
												className="form-control auth__input"
												id="signup_password"
												required={true}
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
											<button
												type="button"
												onClick={toggleShowPassword}
											>
												{
													passwordType === "password"?
													<BsIcons.BsFillEyeFill />
													:
													<BsIcons.BsFillEyeSlashFill />
												}
											</button>
										</div>
									</div>
								</div>
								<br />
								<button type="submit" className="auth__btn">
									{
										proccess ?
										<ImIcons.ImSpinner10 />
										:
										'Sign Up'
									}
								</button>
								<span className="auth_redirectlink">
									<Link to="/login">
										Click Here To Sign In</Link>, If You Already 
										Have An Account
								</span>
							</form>
						</div>
					</div>
				</div>
			</div>
		}
		</>
	)
}

export default Register;