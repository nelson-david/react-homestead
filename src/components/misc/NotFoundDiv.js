
const NotFoundDiv = ({text, style}) => {
	return (
		<div
			className="d-flex justify-content-center"
			id="notfound__div"
			style={style}
		>
			<p>
				{text}
			</p>
		</div>
	)
}

export default NotFoundDiv;