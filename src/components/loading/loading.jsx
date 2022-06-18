import {Rings } from "react-loader-spinner"
import {LoadingDiv} from "./styles"

export default function Loading(){
    return(
        <LoadingDiv><Rings color="#181818" height={200} width={200} /></LoadingDiv>
    )
}