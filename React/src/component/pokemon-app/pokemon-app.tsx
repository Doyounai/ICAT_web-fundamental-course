import { useState } from 'react'
import './pokemon-app.css'
import axios, { AxiosError } from 'axios'
export default function PokemonApp(){
    const [value,setValue] = useState<string>("")
    const [imgUrl,setimgUrl] = useState<string>("")
    const [pokemonName,setPokemonName] = useState<string>("")
    const [errorMsg,setErrorMsg] = useState<string | undefined>("")
    const onSubmitHandler = async () => {
        try{
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
            console.log(data)
            setimgUrl(data.sprites.front_default)
            setPokemonName(data.name)
        }catch(error){
            const err = error as AxiosError<string>
            setErrorMsg(err.response?.data)
        }
    }
    return <>
    <div className='container'>
        <div className='title'>Pokemon app</div>
        <div className='search'>
            <label htmlFor='search-bar'>search pokemon:</label>
            <input onChange={(event)=>{setValue(event.target.value)}} id='search-bar'></input>
            <button onClick={()=>onSubmitHandler()} className='btn'>Search</button>
        </div>
        {errorMsg ? <><h1>{errorMsg}</h1></> : <><img src={imgUrl}/>
        <div>{pokemonName}</div></>}
    </div>
    </>
}