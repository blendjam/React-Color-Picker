import React, { useState } from 'react'

export default function Navitem({navValue, children}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="DropDown-nav">
            <span onClick={() => setOpen(!open)}>{navValue}</span>
            {open && children}
        </div>
    )
}
