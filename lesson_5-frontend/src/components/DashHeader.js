// https://youtu.be/TPAAQnVxc-I?t=20
import { Link } from 'react-router-dom'
import React from 'react'

const DashHeader = () => {

    const content = (
        <header className='dash-header'>
            <div className='dash-header__container'>
                <Link to="/dash">
                    <h1 className='dash-header__title'>techNotes</h1>
                </Link>
                <Link to='/dash/notes'>
                    <nav className='dash-header__nav'>
                        {/* Add nav buttons later */}
                    </nav>
                </Link>
            </div>
        </header>
    )
  return content
}

export default DashHeader