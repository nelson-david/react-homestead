import * as ImIcons from "react-icons/im";

const LoadingDiv = ({icon}) => {
	return (
		<div className="d-flex justify-content-center" id="loading__div">
			<p>
				<ImIcons.ImSpinner4 />
			</p>
		</div>
	)
}

export default LoadingDiv;