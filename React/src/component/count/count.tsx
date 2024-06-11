import { useState } from 'react'
import './count.css'

export default function Count(){
    const [countnum,setCountnum] = useState<number>(0)
    return <>
        <div className='count'>count:{countnum}</div>
        <button onClick={()=>{
            const sum = countnum +1
            setCountnum(sum)
        }} className='btn'>click</button>
    </>
}