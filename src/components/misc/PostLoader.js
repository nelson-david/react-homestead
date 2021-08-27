import * as ImIcons from "react-icons/im";

const PostLoader = () => {
    return (
        <div id="postloader_div">
            <div className="card postloader__card">
                <p>
                    Please wait, we're filling your feed
                <br />

                    <ImIcons.ImSpinner3 />
                </p>
            </div>
        </div>

    )
}

export default PostLoader;