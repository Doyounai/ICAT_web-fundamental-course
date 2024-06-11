function Hello(props:{name:string}) {
    return(
        <div className='bg'>
                <h1>Hello ja</h1>
                <h1>My name is : {props.name}</h1>
        </div>
    ); 
}

export default Hello;