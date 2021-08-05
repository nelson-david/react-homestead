import Interweave from "interweave";
import {useRef, useState} from "react";

const PostTextData = ({body, toggle, style}) => {

	const shortTextRef = useRef();
	const [shortened, setShortened] = useState(false);

	const extendText = (e) => {
		e.preventDefault();
		setShortened(!shortened);

		// const state = String(shortTextRef.current.lastChild.dataset.short);
		// if (state === "true"){
		// 	shortTextRef.current.firstChild.innerText = 
		// 		shortTextRef.current.lastChild.dataset.text;
		// 	shortTextRef.current.lastChild.dataset.short = "false"
		// 	shortTextRef.current.lastChild.innerText = " see less..."
		// }
		// if (state === "false"){
		// 	shortTextRef.current.firstChild.innerText =
		// 		shortTextRef.current.firstChild.innerText.slice(0,200)
		// 	shortTextRef.current.lastChild.dataset.short = "true"
		// 	shortTextRef.current.lastChild.innerText = " see more..."
		// }
	}

	return (
		<div
			className="text"
			style={style}
		>
			{
				body !== null?
					toggle === false?
					<p>
						<Interweave
							content={body}
						/>
					</p>
					:
					<>
						{
							body.length > 200 ?
							<p
								className="post_shorttext"
								ref={shortTextRef}
								onClick={extendText}
							>
								{
									shortened === false?
									<span>
										<Interweave
											content={body.slice(0, 200)}
										/>
									</span>
									:
									<span>
										<Interweave
											content={body}
										/>
									</span>
								}
								<a
									data-text={`${body}`}
									data-short="true"
									href="/see_more"> see more...
								</a>
							</p>
							:
							<p>
								<Interweave
									content={body}
								/>
							</p>
						}
					</>
				:''
			}
		</div>
	)
}

export default PostTextData;