import React from "react";
import { Link } from 'react-router-dom';




const Header = () => {
    return(
        <div className="container">
            <div className="header-menu">
                <Link className="header-menu-item" to='/index'>Головна сторінка</Link>
                <Link className="header-menu-item" to='/about'>Про мене</Link>
                <Link className="header-menu-item" to='/category'>Категорії</Link>
                <Link className="header-menu-item" to='/dashboard'>Мій акаунт</Link>
            </div>
        </div>
    );
}


export default Header;