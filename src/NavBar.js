import React from 'react';
import './NavBar.css';

const NavBar = (props) => {

    return (
        <header className="NavBar">
            {props.children}
        </header>
    )
}

export default NavBar;