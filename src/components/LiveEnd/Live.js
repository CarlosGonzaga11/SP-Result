import './Live.css'
function Live({onGoing,onClick}){
    return(
        <div className='container_button'>
        <button onClick={onClick} className='onGoing'> {onGoing}</button>
        </div>
    )
}
export default Live;