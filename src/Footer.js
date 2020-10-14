import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer({ paletteName, emoji }) {
    return (
        <footer>
            <NavLink to={`${process.env.PUBLIC_URL}/`}>Back</NavLink>
            <p> {paletteName} </p>
            <span className="footer-emoji">{emoji}</span>
        </footer>
    )
}
