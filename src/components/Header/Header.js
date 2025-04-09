import './Header.css'
import CustomButton from '../CustomButton/CustomButton'
import Logo from '../../img/logo.png'
function Header({filterInput,ShippingName}){
    return(
        <div className="header">
            <div className="logo"><img src={Logo}></img></div>
            <div className="input_search">
                <input type="text" onChange={ShippingName} value={filterInput} placeholder='search...'></input>
            </div>
            <div className="button_login_signin">
                <CustomButton title="Login"></CustomButton>
                <CustomButton title="signin"></CustomButton>
            </div>
        </div>
    );
}
export default Header;