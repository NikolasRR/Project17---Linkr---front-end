import { BoxComment, ProfileImage, Infos } from "./style"

export default function Comment({ userName, image, content, idUser, commentUserId, follower }) {


    return (
        <BoxComment>
            <ProfileImage alt={image} src={image}></ProfileImage>
            <Infos>
                <div>
                    
                    <h1>{userName}</h1>
                    <span>{commentUserId === idUser ? "• post’s author" : follower ? "• following" : null}</span>
                
                </div>

                <p>{content}</p>
            </Infos>
        </BoxComment>
    )
}