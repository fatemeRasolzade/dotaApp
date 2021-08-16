import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="main-navbar">
            <ul style={{position: 'absolute', top:'5rem', right:'0'}}>
                {/* <li>
                    <Link href="/register">
                    <a className="main-btn">عضویت</a>
                    </Link>
                </li>
                <li>
                    <Link href="/login">
                    <a className="main-btn">ورود</a>
                    </Link>
                </li> */}
                <li>
                    <Link href="/proplayer">
                    <a className="main-btn">proPlayer</a>
                    </Link>
                </li>
                <li>
                    <Link href="/promatch">
                    <a className="main-btn">proMatch</a>
                    </Link>
                </li>
                <li>
                    <Link href="/heros">
                    <a className="main-btn">Heros</a>
                    </Link>
                </li> 
                <li>
                    <Link href="/teams">
                    <a className="main-btn">Teams</a>
                    </Link>
                </li> 
            </ul>
        </div>
    )
}

export default Navbar
