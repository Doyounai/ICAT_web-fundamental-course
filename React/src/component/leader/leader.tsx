import { useState } from "react";
import './leader.css'
import Player from "./component/player";

export default function Leader(){
    const [leaderName,setLeaderName] = useState<string>("")
    const sampleArr:string[] = ["Tien","Ben","Ten"]
    return <>
        <h1>Leader:{leaderName}</h1>
        {sampleArr.map((value:string)=>{
            return <Player name={value} setLeaderName={setLeaderName}/>
        })}
    </>
}