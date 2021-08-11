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
                    <a className="main-btn">بهترین بازیکنان</a>
                    </Link>
                </li>
                <li>
                    <Link href="/promatch">
                    <a className="main-btn">بهترین بازی ها</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar