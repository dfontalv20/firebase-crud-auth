import React, { useContext } from 'react'
import { UserContext } from '../App';
import { signOut } from '../services/auth.service'
import servicesIcon from '../resources/img/services.png'

export default function Navbar() {
    const user = useContext(UserContext)

    const handleSignOut = () => {
        const confirm = window.confirm('¿Esta seguro que desea cerrar sesion?')
        if (confirm) signOut()
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <div className="container-fluid">
                <img className='navbar-brand mx-5' src={servicesIcon} alt='Icono Servicios' height='75' />
                <h3 className='ms-auto me-5'>{user?.displayName}</h3>
                {
                    user.uid ? <button className='btn btn-danger' onClick={handleSignOut}>X</button> : <></>
                }

            </div>
        </nav>
    )
}
