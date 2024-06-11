import './player.css'

interface IPlayerProps{
    name:string
    setLeaderName:(name:string)=>void
}

export default function Player(props:IPlayerProps){
    return <>
        <div className="player">
            <div>{props.name}</div>
            <button onClick={()=>{props.setLeaderName(props.name)}}>select</button>
        </div>
    </>
}