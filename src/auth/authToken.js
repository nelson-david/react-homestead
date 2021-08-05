import { useState } from 'react';

export default function AuthToken() {

	const getToken = () => {
		const tokenString = window.localStorage.getItem('token');
		return tokenString;
	};

	const getUser = () => {
		const userData = window.localStorage.getItem('user_data');
		return JSON.parse(userData);
	}

	const [token, setToken] = useState(getToken());
	const [user, setUser] = useState(getUser());

	const saveToken = (userToken) => {
		window.localStorage.setItem('token', userToken);
		setToken(userToken);
	};

	const saveUser = (jsonData) => {
		console.log("Saving Token")
		window.localStorage.setItem('user_data', JSON.stringify(jsonData));
		setUser(jsonData);
	}

	const deleteToken = () => {
		window.localStorage.removeItem('token');
		setToken();
	}

	const deleteUser = () => {
		window.localStorage.removeItem('user_data');
		setUser();
	}

	return {
		setUser: saveUser,
		removeUser: deleteUser,
		setToken: saveToken,
		removeToken: deleteToken,
		user,
		token
	}

}
