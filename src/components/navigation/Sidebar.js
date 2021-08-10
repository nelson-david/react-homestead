import '../../assets/css/sidebar.css';
import {Link} from "react-router-dom";

const Sidebar = () => {
	return (
	<div className="card sidebar__card">
	    <div className="header">
	        <p>Some Top Picks For You</p>
	    </div>
	    <div className="body">
	        <span className="header_text">Hash Tags</span>
	        <div id="hashtags">
	            <Link to="/explore/tag/helloworld">#helloworld</Link>
	            <Link to="/explore/tag/helloworld">#coding twice</Link>
	            <Link to="/explore/tag/helloworld">#davidnelson</Link>
	            <Link to="/explore/tag/helloworld">#mobilereunion</Link>
	            <Link to="/explore/tag/helloworld">#procreate</Link>
	            <Link to="/explore/tag/helloworld">#digitalartist</Link>
	            <Link to="/explore/tag/helloworld">#python</Link>
	            <Link to="/explore/tag/helloworld">#javadevelopers</Link>
	            <Link to="/explore/tag/helloworld">#tindermeetups</Link>
	            <Link to="/explore/tag/helloworld">#whatsapp</Link>
	            <Link to="/explore/tag/helloworld">#homesteadcc</Link>
	        </div>
	        <br />
	        <span className="header_text">Trending Posts</span>
	        <div id="posts">
	        </div>
	    </div>
	    <div className="footer">
	        <a href="/explore">See All </a>
	    </div>
	</div>
	)
}

export default Sidebar;