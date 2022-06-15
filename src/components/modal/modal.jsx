import {ModalBackground,ModalContainer,Body,Footer} from "./style"

function Modal(props) {

    const {setIsModalOpen,errorMessage} = props

    return (
      <ModalBackground>
        <ModalContainer>
          <Body>
            <p>{errorMessage}</p>
          </Body>
          <Footer>
            <button onClick={() => setIsModalOpen(false)}>OK</button>
          </Footer>
        </ModalContainer>
      </ModalBackground>
    );
  }
  
export default Modal;

