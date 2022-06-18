import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ModalBackground, ModalContainer, Body, Footer, OkButton, Cancel, DeleteIt } from "./style"

import deletionDataContext from "../../contexts/deletionDataContext";

function Modal(props) {
	const { setIsModalOpen, errorMessage } = props
	const navigate = useNavigate;

	const { deletionData } = useContext(deletionDataContext);
	const { publicationId, id } = deletionData;

	console.log(deletionData);

	async function deletePost () {
	  try {
	      await axios.delete(`http://localhost:5000/post?postId=${publicationId}&linkId=${id}`, { withCredentials: true });
	      navigate("/timeline");
	  } catch (error) {
	      alert('It was not possible to delete the post');
	  }
	}

	return (
		<ModalBackground>
			<ModalContainer>
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
							<DeleteIt onClick={() => {setIsModalOpen(false); deletePost();}}>Yes, delete it</DeleteIt>
						</>
					}
				</Footer>
			</ModalContainer>
		</ModalBackground>
	);
}

export default Modal;

