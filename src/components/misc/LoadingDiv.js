import * as ImIcons from "react-icons/im";

const LoadingDiv = ({icon}) => {
	return (
		<div
			className="d-flex justify-content-center"
			id="loading__div">
			<p className="pt-4">
				{icon===undefined?<ImIcons.ImSpinner2 />:icon}
			</p>
		</div>
	)
}

export default LoadingDiv;