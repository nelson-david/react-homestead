import {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import AuthToken from './auth/authToken';
import Login from "./auth/Login";
import Register from "./auth/Register";
import Navbar from "./components/navigation/Navbar";
import Home from "./pages/Home";
import axios from "axios";

const devApi = "https://homesteadapi.herokuapp.com/api/";
const devURL = "https://homesteadapi.herokuapp.com/";
// const devApi = "http://localhost:7500/api/";
// const devURL = "http://localhost:7500/";

export default function App(){

    const { token, removeToken, setToken, removeUser, setUser } = AuthToken();
    const [currentComponent, setCurrentComponent] = useState("home");
    const [current_user, setCurrentUser] = useState({});
    const [posts, setPosts] = useState([]);

    const logout = (e) => {
        e.preventDefault();
        console.log("Logging Out");
        removeToken();
        removeUser();
    }

    useEffect(() => {
        if (token !== null){
            axios({
                method: 'GET',
                url: `${devApi}current_user/`,
                headers: {
                    'Authorization': token
                }
            }).then((res) => {
                if (res.data.message === false){
                    window.localStorage.clear();
                }else{
                    setCurrentUser(res.data.user);
                    axios({
                        method: 'GET',
                        url: `${devApi}post/all/`,
                        headers: {
                            'Authorization': token
                        }
                    }).then((res) => {
                        setPosts(res.data.posts);
                    });
                }
            });
        }
    }, [token])

    return (
        <>
            <Router>
            		<Navbar
            			logout={logout}
            			activeComponent={currentComponent}
                        token={token}
            		/>
                <Switch>
                    <Route exact path="/login">
                        {
                            token?
                            <Redirect to="/" />
                            :
                            <Login
								setUser={setUser}
								devApi={devApi}
								setCurrentComponent={
                                    () => setCurrentComponent("login")
                                }
								setToken={setToken}
                            />
                        }
                    </Route>
                    <Route exact path="/register">
                        {
                            token?
                            <Redirect to="/" />
                            :
                            <Register
								setUser={setUser}
								devApi={devApi}
								setCurrentComponent={
                                    () => setCurrentComponent("register")
                                }
								setToken={setToken}
                            />
                        }
                    </Route>
                    <Route path="/">
                        {
                            token?
                            <Home
                                logout={logout}
                                devApi={devApi}
                                devURL={devURL}
                                token={token}
                                current_user={current_user?current_user:''}
                                posts={posts.length !== 0?posts:''}
                                setCurrentComponent={
                                    () => setCurrentComponent("home")
                                }
                            />
                            :
                            <Login
                                setUser={setUser}
                                devApi={devApi}
                                setCurrentComponent={
                                    () => setCurrentComponent("login")
                                }
                                setToken={setToken}
                            />
                        }
                    </Route>
                    <Route>
                        <h1>Not Found</h1>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}
