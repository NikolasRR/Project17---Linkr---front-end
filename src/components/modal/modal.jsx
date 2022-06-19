import { useContext, useState } from "react";
import axios from "axios";

import { ModalBackground, ModalContainer, Body, Footer, OkButton, Cancel, DeleteIt } from "./style"
import Loading from "../loading/loading";

import deletionDataContext from "../../contexts/deletionDataContext";

function Modal(props) {
	const { setIsModalOpen, errorMessage } = props
	const [isDeleting, setIsDeleting] = useState(false);

	const { deletionData, setDeletionData, reloadPage, setReloadPage } = useContext(deletionDataContext);
	const { publicationId, id } = deletionData;
	

	console.log(deletionData);

	async function deletePost() {
		setIsDeleting(true);
		try {
			await axios.delete(`${process.env.REACT_APP_API_URL}/post?postId=${publicationId}&linkId=${id}`, { withCredentials: true });
			setDeletionData({});
			setIsModalOpen(false);
			setReloadPage(!reloadPage);

		} catch (error) {
			console.log(error);
			alert('It was not possible to delete the post');
		}
	}

	return (
		<ModalBackground>
			<ModalContainer>
				{
					isDeleting &&
					<Loading></Loading>
				}
				{
					!isDeleting &&
					<>
						<Body>
							<p>{errorMessage ? errorMessage : "Are you sure you want to delete this post?"}</p>
						</Body>
						<Footer>
							{
								errorMessage &&
								<OkButton onClick={() => setIsModalOpen(false)}>OK</OkButton>
							}
							{
								!errorMessage &&
								<>
									<Cancel onClick={() => setIsModalOpen(false)}>No, go back</Cancel>
									<DeleteIt onClick={() => deletePost()}>Yes, delete it</DeleteIt>
								</>
							}
						</Footer>
					</>
				}
			</ModalContainer>
		</ModalBackground>
	);
}

export default Modal;

