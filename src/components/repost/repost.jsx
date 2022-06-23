import  RepostContext from "../../contexts/repostContext";
import { useContext } from "react";
import axios from "axios";

import { ModalBackground, ModalContainer, Body, Footer, Cancel, DeleteIt } from "../modal/style"

export default function AlertRepost(){
	const { repost, setRepost } = useContext(RepostContext)

	const sendData = async()=>{
		const body ={
			userId: repost[0],
			postId: repost[1]
		}
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/reposts`,body, { withCredentials: true });
			setRepost([]);
		} catch (error) {
			setRepost([]);
			alert(error);
		}
	}

    return(
        <ModalBackground>
			<ModalContainer>
				{
					<>
						<Body>
							<p>Deseja realmente compartilhar este post?</p>
						</Body>
						<Footer>
								<Cancel onClick={() => setRepost([])}>Não, cancelar</Cancel>
							<DeleteIt onClick={() => sendData()}>Sim, prossiga!</DeleteIt>
						</Footer>
					</>
				}
			</ModalContainer>
		</ModalBackground>
    )
}