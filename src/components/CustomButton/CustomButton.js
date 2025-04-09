import './Button.css'
function CustomButton({title}){
    return(
        <div className='button'>
        <button>{title}</button>
        </div>
    )
}
export default CustomButton;