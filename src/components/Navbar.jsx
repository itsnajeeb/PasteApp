import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='w-full flex justify-center gap-10 mt-5 text-blue-600 font-bold'>
            <NavLink to="/">
                Home
            </NavLink>

            <NavLink to="/pastes">
                Pastes
            </NavLink>
        </div>
    )
}

export default Navbar
