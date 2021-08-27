import * as MdIcons from "react-icons/md";

const SelectedImage = (props) => {
  return (
    <>
      <div className="col-xl-4 col-lg-5 col-md-4 col-sm-6 col-6 column">
        <i className="float-right">
          <MdIcons.MdCancel
            data-index={props.passedIndex}
            data-name={props.value}
            onClick={props.removeSingleImage}
          />
        </i>
        <img
          data-index={props.passedIndex}
          src={props.value}
          alt={props.value}
          data-name={props.value}
          className="img-fluid"
          onClick={props.getSingleImage}
        />
      </div>
    </>
  )
}

export default SelectedImage;