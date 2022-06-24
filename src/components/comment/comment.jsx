import { BoxComment, ProfileImage, Infos } from "./style"

export default function Comment({ userName, image, content, idUser, commentUserId, infoId }) {

    console.log("aquiii vai", infoId.followerId);

    return (
        <BoxComment>
            <ProfileImage alt={image} src={image}></ProfileImage>
            <Infos>
                <div>
                    
                    <h1>{userName}</h1>
                    <span>{commentUserId === idUser ? "• post’s author" : commentUserId == infoId.followerId ? "• following" : null}</span>
                
                </div>

                <p>{content}</p>
            </Infos>
        </BoxComment>
    )
}