import styled from "styled-components"
import { CgHeart} from "react-icons/cg";

function Post(){
    return(
        <Content>
            <ProfileImage>
                <div>
                    <CgHeart></CgHeart>                    
                </div> 
                <p>likes</p>              
            </ProfileImage>
            <Publication> 
                <Name>Juvenal Juvêncio</Name>
                <Text> Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</Text>
                <Url></Url>                           
            </Publication>
        </Content> 
    )
}

export default Post;


const Content = styled.div`
    margin-bottom: 29px;
    max-width: 100%;
    min-height: 276px;
    background: #171717;
    border-radius: 16px;
    display:flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding:22px;
    @media(max-width: 611px) {
        min-height: 232px;
        border-radius:0;
        margin-top: 16px;
    }

`
const ProfileImage = styled.div`
    width: 53px;
    height: 53px;
    background: yellow;
    border-radius: 26.5px;
    display: flex;
    flex-direction: column;
    align-items:center;
        div{
            color: #FFF;
            margin-top: 70px;  
            font-size: 90;
            font-weight: 900;
        }

        p{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            text-align: center;
            color: #FFFFFF;
        }

    @media(max-width: 611px) {
        width: 40px;
        height: 40px;
        
    }

`

const Publication = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 89%;
    height: 100%;
    margin-left:5px;

    div{
        width:100%;
        display: flex;
        justify-content: flex-end;
    }
   
`

const Name = styled.p`
    height: 23px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    margin-bottom:10px;
    width: 100%;
    overflow-x: hidden;
    
    @media(max-width: 611px) {
        font-size: 17px;
        line-height: 20px;
        margin-bottom:7px;
    }
    
`
const Text = styled.p`
    width: 100%;
    height: 52px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    margin-bottom:10px;
    @media(max-width: 611px) {
        font-size: 15px;
        line-height: 18px;
        color: #B7B7B7;
        margin-bottom: 13px;
    }
`

const Url = styled.div`
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
`