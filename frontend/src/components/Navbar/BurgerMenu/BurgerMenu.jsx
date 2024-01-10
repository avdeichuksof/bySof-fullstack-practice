import './burgerMenu.css';

const BurguerMenu = (props) => {
    return (
        <div onClick={props.clickHandler} 
        className={`burguer-icon ${props.click ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default BurguerMenu;