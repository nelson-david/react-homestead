import {useState} from "react";
import * as RiIcons from "react-icons/ri";
import AvatarImg from "../../assets/img/main2.jpg";
import SelectedImage from "../sub/SelectedImage";
import ImageModal from "../sub/ImageModal";
import ScrollContainer from 'react-indiana-drag-scroll';
import * as ImIcons from "react-icons/im";
import axios from "axios";

const CreatePostCard = ({token, devApi, current_user, success}) => {

	const [proccess, setProccess] = useState(false);
	const [imageSelectedState, setImageSelectedState] = useState(false);
	const [imageURL, setImageURL] = useState([]);
	const [newFileObj, setNewFileObj] = useState([]);
	const [showSingleImage, setShowSingleImage] = useState("");
	const [startIndex, setStartIndex] = useState(0);
	const [buttonState, setButtonState] = useState(false);

	setTimeout(() => {
		if (imageURL.length === 0){
			setImageSelectedState(false);
		}
	}, 1);

	const fileObj = [];
	const fileArray = [];

	const handleSelect = (selectedIndex, e) => {
		setStartIndex(selectedIndex);
	}
	const handleFileChange = (e) => {
		fileObj.push(e.target.files);
		setNewFileObj(e.target.files);
		for (let i = 0; i < fileObj[0].length; i++) {
			fileArray.push(URL.createObjectURL(fileObj[0][i]));
		}
		setImageURL(imageURL.concat(fileArray));
		setImageSelectedState(true);
	}
	const getSingleImage = (e) => {
		const imgSRC = e.currentTarget.dataset.name;
		const index = e.currentTarget.dataset.index;
		setStartIndex(index);
		setShowSingleImage(imgSRC);
	}
	function arrayRemove(arr, value) {
		return arr.filter(function(ele){
			return ele !== value;
		});
	}
	const removeSingleImage = (e) => {
		const name = e.currentTarget.dataset.name;
		var result = arrayRemove(imageURL, name);
		setImageURL(result);
	}

	const addPost = (e) => {
		e.preventDefault();
		setButtonState(true);
		setProccess(true);

		const __data = document.getElementById("post_textdata").innerText;

		var form_data = new FormData();
		form_data.append("body", __data);
		var totalfiles = newFileObj.length;
		for (var index = 0; index < totalfiles; index++) {
			form_data.append("files", newFileObj[index]);
			console.log("appended");
		}

		axios({
			method:"POST",
			data: form_data,
			dataType: 'json',
			contentType: false,
			processData: false,
			url: `${devApi}post/add/`,
			headers: {
				'Authorization': token
			},
		}).then((res) => {
			setProccess(false);
			if (res.data.message === "success"){
				setButtonState(false);
				document.getElementById("post_textdata").innerText = "";
				setImageSelectedState(false);
				setNewFileObj([]);
				success();
			}
		});
	}

	return (
	<div className="card add__postcard">
		{
			showSingleImage !== "" ?
			<ImageModal
				image={showSingleImage}
				images={imageURL}
				indexToStart={startIndex}
				resetImgSRC={() => setShowSingleImage("")}
				handleSelect={handleSelect}
			/>
			: ''
		}
		<div className="card-header">
			<span>Say Something</span>
			<hr />
		</div>
		<div className="card-body">
			<div className="content">
				<form id="add_postform" onSubmit={addPost}>
					<div className="first">
						<a href="/profile" id="profileDisplayImgLink">
							<img
								src={AvatarImg}
								alt="displayImg"
								loading="lazy"
								id="profileDisplayImg"
							/>
						</a>
						<div className="form-group" id="add_postform_group">
							<span
								contentEditable="true"
								data-placeholder={`@${current_user.username}, 
									You Got An Update`}
								id="post_textdata"></span>
						</div>
					</div>
					<div id="add__postfilediv">
						<input
							type="file"
							hidden
							multiple
							id="image_input"
							accept="image/*"
							onChange={handleFileChange}
						/>

						<label htmlFor="image_input" className="label_button">
							<RiIcons.RiImageAddFill />
						</label>
					</div>
					<>
					{
						imageSelectedState ?
						<ScrollContainer className="prev_image_div">
							{imageURL ? imageURL.map((value, index) => {
								return(
								<SelectedImage
									key={index}
									value={value}
									getSingleImage={getSingleImage}
									removeSingleImage={removeSingleImage}
									passedIndex={index}
								/>
								)
							}) : ''}
						</ScrollContainer>:''
					}
					</>
					<button
						className="float-right"
						id="add__post_btn"
						disabled={buttonState}
					>
						{
							proccess ?
							<ImIcons.ImSpinner10 />
							:'Add Post'
						}
					</button>
				</form>
			</div>
		</div>
	</div>
	)
}

export default CreatePostCard;