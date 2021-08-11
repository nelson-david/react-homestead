import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import '../assets/css/auth.css';
import LoginImg from "../assets/img/LoginImg.jpeg";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import * as BsIcons from "react-icons/bs";

const Login = ({setCurrentComponent, setToken, setUser, devApi}) => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [proccess, setProccess] = useState(false);
	const [acctError, setAcctError] = useState(false);
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

	const handleLogin = (e) => {
		e.preventDefault();
		setProccess(true);
		axios({
			method:"POST",
			data: {
				username, password
			},
			url: `${devApi}auth/login/`,
		}).then((res) => {
			setUsername("");
			setPassword("");
			setProccess(false);
			if (res.data.message === false){
				setAcctError(true);
			}
			if (res.data.message === true){
				setUser(res.data.user);
				setToken(res.data.token);
			}
		});
	}

	return (
		<div className="container-fluid">
			<br />
			<div className="row d-flex"
				id="auth__row">
				<div className="col-xl-5 col-lg-6 col-md-5"
					id="auth__imgcol">
					<p>
						Homesteading Singles is a Social Platform for 
						People considering getting into Programming in General
					</p>
					<img
						src={LoginImg}
						alt="authImg"
						className="img-fluid"
					/>
				</div>
				<div className="col-xl-6 col-xl-6 col-md-7 col-sm-10"
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
								:''
							}
						</div>
						<p id="auth__legend">Welcome Back!</p>

						<form id="signin_form" onSubmit={handleLogin}>
							<div className="row">
								<div className="col-sm-6 col-12 form-group auth_group">
									<input
										type="text"
										name="auth_username"
										placeholder="Username"
										className="form-control form-control-lg auth__input"
										id="signin_username"
										required={true}
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<div className="col-sm-6 col-12 form-group auth_group">
									<div className="d-flex">
										<input
											type={passwordType}
											name="auth_password"
											placeholder="Password"
											className="form-control 
												form-control-lg auth__input"
											id="signin_password"
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
									'Sign In'
								}
							</button>
							<span className="auth_redirectlink">
								<Link to="/register">
									Click Here To Sign Up</Link>, If You Don't 
									Have An Account
							</span>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;